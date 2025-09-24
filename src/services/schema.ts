import { z } from "zod"

export const listForSaleSchema = z.object({
  listingPrice: z.number().positive("Enter a valid price > 0"),
  amount: z.number().positive("Enter a valid amount > 0"),
  paymentAsset: z.string(),
  listingDuration: z.string(),
  targetBuyer: z.string().optional(),
})

export const whitelistContractSchema = z.object({
  whitelisted: z
    .string()
    .min(1, "Contract address is required")
    .regex(
      /^[a-zA-Z0-9]+\.{1}[a-zA-Z0-9_-]+$/,
      "Contract address must be in the format: address.contractName"
    ),
  isWhitelisted: z.boolean({
    required_error: "Whitelisted status is required",
  }),
})

export const marketplaceSchema = z.object({
  principal: z.string().min(1, "Principal is required"),
  role: z.enum(["admin", "fulfill"] as const),
})
