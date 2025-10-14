import { Button } from "@workspace/ui/components/button"
import Logo from "@workspace/ui/components/logo"
import Link from "next/link"
import * as React from "react"
import { Separator } from "@workspace/ui/components/separator"

const legalLinks = [
    { label: "Terms and Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/" },
    { label: "Risk Disclosure", href: "/" },
    { label: "Compliance", href: "/" },
] as const

const Footer: React.FC = () => {
    return (
        <footer className="border-t bg-muted/50 py-12">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div>
                            <Logo />
                            <p className="mt-4 mb-4 text-sm text-muted-foreground">
                                Tokenized real estate secured by Bitcoin. Unlock liquidity
                                without selling your property.
                            </p>
                            <div className="flex gap-4">
                                {["Twitter", "LinkedIn", "Discord"].map((social) => (
                                    <Button
                                        key={social}
                                        variant="ghost"
                                        size="sm"
                                        className="p-2"
                                    >
                                        <span className="text-xs">{social}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-4 font-semibold">Product</h4>
                            <div className="space-y-2 text-sm">
                                {[
                                    "How It Works",
                                    "APT Tokens",
                                    "PXT Governance",
                                    "Security",
                                ].map((item) => (
                                    <button
                                        key={item}
                                        className="block text-muted-foreground transition-colors
                      hover:text-foreground"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-4 font-semibold">Resources</h4>
                            <div className="space-y-2 text-sm">
                                {[
                                    "Documentation",
                                    "Investment Guide",
                                    "Case Studies",
                                    "Blog",
                                ].map((item) => (
                                    <button
                                        key={item}
                                        className="block text-muted-foreground transition-colors
                      hover:text-foreground"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-4 font-semibold">Legal</h4>
                            <div className="space-y-2 text-sm">
                                {legalLinks.map(({ label, href }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        className="block text-muted-foreground transition-colors
                      hover:text-foreground"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    <div
                        className="flex flex-col items-center justify-between text-sm
              text-muted-foreground md:flex-row"
                    >
                        <p>© {new Date().getFullYear()} PropertyX. All rights reserved.</p>
                        <p>
                            Securities offered through PropertyX Securities, LLC. Member
                            FINRA/SIPC.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
