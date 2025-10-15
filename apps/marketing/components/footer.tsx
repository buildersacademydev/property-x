import { Button } from "@workspace/ui/components/button"
import Logo from "@workspace/ui/components/logo"
import Link from "next/link"
import * as React from "react"
import { Separator } from "@workspace/ui/components/separator"

const legalLinks = [
    { label: "Terms and Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/coming-soon" },
    { label: "Risk Disclosure", href: "/coming-soon" },
    { label: "Compliance", href: "/coming-soon" },
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
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-2"
                                    asChild
                                >
                                    <Link
                                        href="https://x.com/propertyx_fi"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="text-xs">Twitter (X)</span>
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-2"
                                    asChild
                                >
                                    <Link
                                        href="https://www.linkedin.com/company/buildersacademy/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="text-xs">LinkedIn</span>
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-2"
                                    asChild
                                >
                                    <Link
                                        href="https://discord.gg/HNhfAugqjb"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="text-xs">Discord</span>
                                    </Link>
                                </Button>
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
                                    <Link
                                        key={item}
                                        href="/coming-soon"
                                        className="block text-muted-foreground transition-colors
                      hover:text-foreground"
                                    >
                                        {item}
                                    </Link>
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
                                    <Link
                                        key={item}
                                        href="/coming-soon"
                                        className="block text-muted-foreground transition-colors
                      hover:text-foreground"
                                    >
                                        {item}
                                    </Link>
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
                        <p className="text-center md:text-right">
                            Made with ❤️ by{" "}
                            <Link
                                href="https://www.buildersacademy.ai/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-foreground/80 transition-colors hover:text-foreground hover:underline"
                            >
                                Builders Academy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
