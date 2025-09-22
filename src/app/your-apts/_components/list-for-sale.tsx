"use client"

import { getRequest } from "@/services/api"
import { Cl } from "@stacks/transactions"
import { toast } from "sonner"
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

type Props = {
  contract: string
  currentBlockHeight: number
}

export function ListForSaleDialog({ contract, currentBlockHeight }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return
    const form = e.currentTarget
    const fd = new FormData(form)

    const price = Number(fd.get("listingPrice") || 0)
    const amount = Number(fd.get("amount") || 0)
    const paymentAsset = String(fd.get("paymentAsset") || "STX")
    const listingDuration = String(fd.get("listingDuration") || "7 days")
    const targetBuyer = String(fd.get("targetBuyer") || "").trim()
    if (!contract) return toast.error("Missing asset contract")
    if (!isFinite(price) || price <= 0)
      return toast.error("Enter a valid price > 0")
    if (!Number.isFinite(amount) || amount <= 0)
      return toast.error("Enter a valid amount > 0")

    try {
      setLoading(true)
      const finalPrice = paymentAsset !== "STX" ? price * 100 : price
      const ftArgs = [
        Cl.contractPrincipal(env.CONTRACT_ADDRESS, "mock-token"),
        Cl.tuple({
          taker: Cl.none(),
          amt: safeUint(amount * 1000000),
          expiry: safeUint(currentBlockHeight + listingDuration),
          price: safeUint(finalPrice),
          "payment-asset-contract":
            paymentAsset === "STX"
              ? Cl.none()
              : Cl.some(Cl.principal(paymentAsset)),
        }),
      ]
      await getRequest({
        args: ftArgs,
        functionName: "list-asset-ft",
      })
      setOpen(false)
      router.push("/your-listing")
    } catch (err: any) {
      toast.error(String(err?.message || err || "Failed to create listing"))
      setLoading(false)
    } finally {
      setLoading(false)
      setOpen(false)
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
        <form onSubmit={onSubmit} className="grid gap-4">
          <input type="hidden" name="assetContract" value={contract} />

          <div className="grid gap-2">
            <label className="text-sm font-medium">Listing Price</label>
            <input
              className="rounded-md border bg-background px-3 py-2"
              name="listingPrice"
              type="number"
              step="any"
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Amount</label>
            <input
              className="rounded-md border bg-background px-3 py-2"
              name="amount"
              type="number"
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">
              FT Asset Contract Address
            </label>
            <input
              className="rounded-md border bg-muted px-3 py-2
                text-muted-foreground"
              type="text"
              disabled
              value="ST3Y14WTFX25M75376066Q8V5YY1RCBCDE0KC5MBF.tech"
              readOnly
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Payment Asset</label>
            <select
              className="rounded-md border bg-background px-3 py-2"
              name="paymentAsset"
              defaultValue="STX"
            >
              <option value="STX">STX</option>
              <option value="SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token">
                SBTC
              </option>
              <option value="SPN5AKG35QZSK2M8GAMR4AFX45659RJHDW353HSG.usdh-token-v1">
                USDC
              </option>
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Listing Duration</label>
            <select
              className="rounded-md border bg-background px-3 py-2"
              name="listingDuration"
              defaultValue="7 days"
            >
              <option value="20927">7 Days</option>
              <option value="41855">14 Days</option>
              <option value="89689">30 Days</option>
              <option value="179377">60 Days</option>
              <option value="269066">90 Days</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Target Buyer (optional)
            </label>
            <input
              className="rounded-md border bg-background px-3 py-2"
              name="targetBuyer"
              type="text"
              placeholder="Stacks address"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Listing..." : "List"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
