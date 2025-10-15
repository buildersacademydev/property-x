"use client"
import React from 'react'
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Icons } from "@workspace/ui/components/icons"

const ComingSoon = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center space-y-8">
                        {/* Status Badge */}
                        <div className="flex justify-center">
                            <Badge
                                variant="outline"
                                className="border-primary/30 bg-primary/10 px-6 py-3 text-base font-semibold text-primary backdrop-blur-sm animate-pulse"
                            >
                                <Icons.clock className="mr-2 h-5 w-5" />
                                Testnet Launch In Progress
                            </Badge>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                                PropertyX Is
                                <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                                    Going Live Soon
                                </span>
                            </h1>

                            <p className="mx-auto max-w-2xl text-xl sm:text-2xl text-muted-foreground text-balance leading-relaxed">
                                Our team is working day and night to bring PropertyX to testnet
                            </p>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                                <CardContent className="p-6 space-y-3">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                                        <Icons.plug className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Testnet Deploy</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Smart contracts being deployed and tested on Stacks testnet
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-secondary/30 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/5">
                                <CardContent className="p-6 space-y-3">
                                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto">
                                        <Icons.shield className="h-6 w-6 text-secondary" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Security First</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Rigorous testing and auditing to ensure platform security
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                                <CardContent className="p-6 space-y-3">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                                        <Icons.zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Final Testing</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Quality assurance and performance optimization in progress
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Progress Indicator */}
                        <div className="max-w-2xl mx-auto mt-12 space-y-4">
                            <div className="flex items-center justify-between text-sm font-medium">
                                <span className="text-muted-foreground">Launch Progress</span>
                                <span className="text-primary">92%</span>
                            </div>
                            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                                    style={{ width: '92%' }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <Card className="max-w-2xl mx-auto mt-12 border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <h3 className="text-lg font-semibold mb-6 flex items-center justify-center gap-2">
                                    <Icons.clock className="h-5 w-5 text-primary" />
                                    Launch Timeline
                                </h3>
                                <div className="space-y-4 text-left">
                                    <div className="flex items-start gap-4">
                                        <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-success">Smart Contract Deployment</p>
                                            <p className="text-sm text-muted-foreground">Completed</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse" />
                                        <div>
                                            <p className="font-medium text-primary">Testing & Security Audit</p>
                                            <p className="text-sm text-muted-foreground">In Progress</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-2 h-2 rounded-full bg-muted-foreground/30 mt-2 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-muted-foreground">Public Testnet Launch</p>
                                            <p className="text-sm text-muted-foreground">Coming Very Soon</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Call to Action */}
                        <div className="mt-12 pt-8 border-t border-border/50">
                            <p className="text-muted-foreground">
                                Want to be notified when we launch?{" "}
                                <a
                                    href="mailto:team@propertyx.io"
                                    className="text-primary hover:underline font-medium"
                                >
                                    Contact us
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% {
                        background-size: 200% 200%;
                        background-position: 0% 50%;
                    }
                    50% {
                        background-size: 200% 200%;
                        background-position: 100% 50%;
                    }
                }
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    )
}

export default ComingSoon