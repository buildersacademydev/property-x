import React from 'react'

const Page = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background text-foreground flex items-center justify-center px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                        <svg
                            className="w-24 h-24 text-primary relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
                    Coming Soon
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Our Whitepaper is on its way
                </p>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 mb-8 shadow-2xl">
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-secondary rounded-full animate-pulse delay-75"></div>
                            <div className="w-3 h-3 bg-primary rounded-full animate-pulse delay-150"></div>
                        </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                        We&apos;re Working Around the Clock
                    </h2>

                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                        Our dedicated legal team is working day and night to bring you a comprehensive
                        whitepaper that details our vision, technology, and roadmap.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Legal Review in Progress</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span>Final Touches Being Added</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page