import ComingSoon from "@/components/coming-soon"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Coming Soon | PropertyX",
    description: "This feature is currently under development. Join our waitlist to be the first to know when we launch!",
}

export default function ComingSoonPage() {
    return <ComingSoon />
}
