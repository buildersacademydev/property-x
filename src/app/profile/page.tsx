"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Admin from "./admin"
import Assets from "./assets"
import ProfileInfo from "./profile-info"

const Page = () => {
  return (
    <div className="container mx-auto max-w-5xl p-4 sm:p-6">
      <ProfileInfo />
      <div className="mt-6">
        <Tabs defaultValue="assets">
          <TabsList>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="mt-4">
            <Assets />
          </TabsContent>
          <TabsContent value="admin" className="mt-4">
            <Admin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Page
