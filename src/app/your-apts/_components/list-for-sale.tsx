"use client"

import { getRequest } from "@/services/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Cl } from "@stacks/transactions"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { env } from "@/lib/config/env"
import { safeUint } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  listingPrice: z.number().positive("Enter a valid price > 0"),
  amount: z.number().positive("Enter a valid amount > 0"),
  paymentAsset: z.string(),
  listingDuration: z.string(),
  targetBuyer: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
  contract: string
  currentBlockHeight: number
}

export function ListForSaleDialog({ contract, currentBlockHeight }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listingPrice: 0,
      amount: 0,
      paymentAsset: "STX",
      listingDuration: "20927",
      targetBuyer: "",
    },
  })

  async function onSubmit(values: FormValues) {
    if (loading) return

    if (!contract) return toast.error("Missing asset contract")

    try {
      setLoading(true)
      const finalPrice =
        values.paymentAsset !== "STX"
          ? values.listingPrice * 100
          : values.listingPrice
      const ftArgs = [
        Cl.contractPrincipal(env.CONTRACT_ADDRESS, "mock-token"),
        Cl.tuple({
          taker: Cl.none(),
          amt: safeUint(values.amount * 1000000),
          expiry: safeUint(currentBlockHeight + Number(values.listingDuration)),
          price: safeUint(finalPrice),
          "payment-asset-contract":
            values.paymentAsset === "STX"
              ? Cl.none()
              : Cl.some(Cl.principal(values.paymentAsset)),
        }),
      ]
      const res = await getRequest({
        args: ftArgs,
        functionName: "list-asset-ft",
      })
      setOpen(false)
      router.push("/your-listing")
    } catch (err: any) {
      toast.error(String(err?.message || err || "Failed to create listing"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1">List for Sale</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>List for Sale</DialogTitle>
          <DialogDescription>
            Set your listing details and publish.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="listingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Enter price"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-2">
              <label className="text-sm font-medium">
                FT Asset Contract Address
              </label>
              <Input
                className="bg-muted text-muted-foreground"
                type="text"
                disabled
                value="ST3Y14WTFX25M75376066Q8V5YY1RCBCDE0KC5MBF.tech"
                readOnly
              />
            </div>

            <FormField
              control={form.control}
              name="paymentAsset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Asset</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment asset" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="STX">STX</SelectItem>
                      <SelectItem value="SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token">
                        SBTC
                      </SelectItem>
                      <SelectItem value="SPN5AKG35QZSK2M8GAMR4AFX45659RJHDW353HSG.usdh-token-v1">
                        USDC
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="listingDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Duration</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="20927">7 Days</SelectItem>
                      <SelectItem value="41855">14 Days</SelectItem>
                      <SelectItem value="89689">30 Days</SelectItem>
                      <SelectItem value="179377">60 Days</SelectItem>
                      <SelectItem value="269066">90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetBuyer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Buyer (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Stacks address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
                loading={loading}
              >
                List Apt
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
