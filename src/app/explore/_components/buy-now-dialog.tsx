"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const buyFormSchema = z.object({
  amount: z.coerce
    .number()
    .min(1, "Amount must be at least 1")
    .max(1000000, "Amount is too large"),
})

type BuyFormData = z.infer<typeof buyFormSchema>

interface ListingWithDetails {
  listingId: number
  amount: number
  expiry: number
  maker: string
  paymentAssetContract: string | null
  price: number
  taker: string | null
  topic: string
  assetContract: string
  contractName: string
  contractDescription: string
  contractImage: string
  assetName: string
  assetImage: string
  assetLocation: string
  assetValuation: string
  assetTokens: string
  assetApr: string
  assetDescription: string
  assetStaking: string
}

interface BuyNowDialogProps {
  listing: ListingWithDetails
  children: React.ReactNode
  disabled?: boolean
}

export function BuyNowDialog({
  listing,
  children,
  disabled,
}: BuyNowDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<BuyFormData>({
    resolver: zodResolver(buyFormSchema),
    defaultValues: {
      amount: 1,
    },
  })

  const onSubmit = async (data: BuyFormData) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success(
        `Successfully purchased ${data.amount} tokens of ${listing.assetName}`
      )
      setOpen(false)
      form.reset()
    } catch (error) {
      toast.error("Failed to complete purchase. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const watchedAmount = form.watch("amount")
  const totalCost = (watchedAmount || 0) * listing.price

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={disabled}>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy {listing.assetName}</DialogTitle>
          <DialogDescription>
            Enter the amount of tokens you want to purchase. Current price:{" "}
            {listing.price} tokens each.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      min="1"
                      max={listing.amount}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Available: {listing.amount} tokens
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {totalCost > 0 && (
              <div className="rounded-lg bg-muted p-3">
                <div className="flex justify-between text-sm">
                  <span>Total Cost:</span>
                  <span className="font-semibold">{totalCost} tokens</span>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Buy Now"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
