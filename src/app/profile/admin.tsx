"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// 1) Whitelist Token Contract
const whitelistSchema = z.object({
  contractAddress: z.string().min(1, "Contract address is required"),
  isWhitelisted: z.enum(["true", "false"] as const),
})

// 2) Update Marketplace Contract
const marketplaceSchema = z.object({
  principal: z.string().min(1, "Principal is required"),
  role: z.enum(["admin", "fulfill"] as const),
})

const Admin = () => {
  // Form 1: Whitelist
  const whitelistForm = useForm<z.infer<typeof whitelistSchema>>({
    resolver: zodResolver(whitelistSchema),
    defaultValues: { contractAddress: "", isWhitelisted: "true" },
    mode: "onChange",
  })

  // Form 2: Marketplace update
  const marketplaceForm = useForm<z.infer<typeof marketplaceSchema>>({
    resolver: zodResolver(marketplaceSchema),
    defaultValues: { principal: "", role: "admin" },
    mode: "onChange",
  })

  const onSubmitWhitelist = (values: z.infer<typeof whitelistSchema>) => {
    // Submit handler placeholder
    console.log("Whitelist submit", values)
  }

  const onSubmitMarketplace = (values: z.infer<typeof marketplaceSchema>) => {
    // Submit handler placeholder
    console.log("Marketplace update submit", values)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Whitelist Token Contract */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            Whitelist Token Contract
          </CardTitle>
          <CardDescription>
            Make the given contract address whitelist for the PropertyX
            ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Form {...whitelistForm}>
            <form
              onSubmit={whitelistForm.handleSubmit(onSubmitWhitelist)}
              className="grid gap-4"
            >
              <FormField
                control={whitelistForm.control}
                name="contractAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contract address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={whitelistForm.control}
                name="isWhitelisted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Whitelisted</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="grid grid-cols-2 gap-3"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <label
                          className="inline-flex items-center gap-2 text-sm"
                        >
                          <RadioGroupItem value="true" /> True
                        </label>
                        <label
                          className="inline-flex items-center gap-2 text-sm"
                        >
                          <RadioGroupItem value="false" /> False
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Update Marketplace Contract */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            Update Marketplace Contract
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Form {...marketplaceForm}>
            <form
              onSubmit={marketplaceForm.handleSubmit(onSubmitMarketplace)}
              className="grid gap-4"
            >
              <FormField
                control={marketplaceForm.control}
                name="principal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Principal</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter principal address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={marketplaceForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="grid grid-cols-2 gap-3"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <label
                          className="inline-flex items-center gap-2 text-sm"
                        >
                          <RadioGroupItem value="admin" /> Admin
                        </label>
                        <label
                          className="inline-flex items-center gap-2 text-sm"
                        >
                          <RadioGroupItem value="fulfill" /> Fulfill
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Update</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Admin
