import { getWalletAddress } from "@/db/actions/wallet"
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

import EmptyWallet from "@/components/empty-wallet"
import ProfileInfo from "./profile-info"
import Assets from "./assets"
import Admin from "./admin"

const Page = async () => {
    const stxAddress = await getWalletAddress()
    return (
        <div className="container mx-auto max-w-5xl p-4 sm:p-6">
            <ProfileInfo />
            {stxAddress ? (
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
            ) : (
                <EmptyWallet />
            )}
        </div>
    )
}

export default Page
