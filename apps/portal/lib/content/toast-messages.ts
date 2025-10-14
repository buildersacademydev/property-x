import { RealtimeEvents } from "../realtime/realtime"
import { TWebhookRoutes } from "./constant"

interface ToastMessages {
    webhook: Record<
        TWebhookRoutes,
        {
            title: string
            pending: {
                message: string
            }
            success: {
                message: string
                tag: Required<RealtimeEvents["notification"]["data"]["tag"]>
            }
        }
    >
}

export const TOAST_MESSAGES: ToastMessages = {
    webhook: {
        "cancel-listing": {
            title: "Cancel Listing",
            pending: {
                message: "Canceling your listing...",
            },
            success: {
                message: "Listing canceled successfully.",
                tag: ["apts", "listings"],
            },
        },
        "fulfill-listing-stx": {
            title: "Fulfill Listing STX",
            pending: {
                message: "Processing STX fulfillment...",
            },
            success: {
                message: "Listing for STX fulfilled successfully.",
                tag: "listings",
            },
        },
        listing: {
            title: "Create Listing",
            pending: {
                message: "Creating your listing...",
            },
            success: {
                message: "Listing created successfully.",
                tag: ["apts", "listings"],
            },
        },
        staking: {
            title: "Stake Assets",
            pending: {
                message: "Staking in progress...",
            },
            success: {
                message: "Assets staked successfully.",
                tag: "apts",
            },
        },
        unstaking: {
            title: "Unstake Assets",
            pending: {
                message: "Unstaking in progress...",
            },
            success: {
                message: "Assets unstaked successfully.",
                tag: "apts",
            },
        },
        "update-listing": {
            title: "Update Listing",
            pending: {
                message: "Updating your listing...",
            },
            success: {
                message: "Listing updated successfully.",
                tag: ["apts", "listings"],
            },
        },
        "white-listing": {
            title: "Whitelist Address",
            pending: {
                message: "Adding address to whitelist...",
            },
            success: {
                message: "Address whitelisted successfully.",
                tag: "apts",
            },
        },
    },
}
