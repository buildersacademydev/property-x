"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function FaqSection() {
  const [activeTab, setActiveTab] = useState("legal")

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-pretty text-muted-foreground">
              Everything you need to know about PropertyX tokenization
            </p>
          </div>

          {/* FAQ Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { id: "legal", label: "Legal & Compliance" },
                { id: "investment", label: "Investment Process" },
                { id: "returns", label: "Returns & Rewards" },
                { id: "technical", label: "Technical" },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  onClick={() => setActiveTab(tab.id)}
                  className="transition-all duration-300"
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          {/* FAQ Content */}
          <div className="space-y-4">
            {activeTab === "legal" && (
              <div className="animate-in space-y-4 duration-500 fade-in">
                {[
                  {
                    q: "Is PropertyX legally compliant?",
                    a: "Yes, PropertyX operates under existing securities regulations. All APT tokens are properly registered and compliant with federal and state laws. We work with top legal firms specializing in digital securities.",
                  },
                  {
                    q: "What happens to my ownership rights?",
                    a: "Property owners retain full legal ownership and control. APT tokens represent economic rights to cash flow distributions, not ownership transfer. You maintain all decision-making authority over your property.",
                  },
                  {
                    q: "Are there any regulatory risks?",
                    a: "We continuously monitor regulatory developments and maintain compliance with all applicable laws. Our legal structure is designed to adapt to evolving regulations in the digital securities space.",
                  },
                ].map((faq, index) => (
                  <Card
                    key={index}
                    className="bg-card/80 p-6 backdrop-blur-sm transition-all
                      duration-300 hover:shadow-lg"
                  >
                    <h4 className="mb-3 font-semibold">{faq.q}</h4>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "investment" && (
              <div className="animate-in space-y-4 duration-500 fade-in">
                {[
                  {
                    q: "What's the minimum investment amount?",
                    a: "The minimum investment varies by property but typically starts at $1,000 for APT tokens. This allows broad access to high-quality real estate investments that were previously only available to institutional investors.",
                  },
                  {
                    q: "How do I evaluate properties before investing?",
                    a: "Each property listing includes comprehensive due diligence materials: financial statements, property inspections, market analysis, and projected returns. We also provide third-party appraisals and legal documentation.",
                  },
                  {
                    q: "Can I sell my APT tokens?",
                    a: "Yes, APT tokens are designed to be tradeable on secondary markets. Liquidity typically develops within 30-60 days of initial token launch, allowing you to exit your position if needed.",
                  },
                ].map((faq, index) => (
                  <Card
                    key={index}
                    className="bg-card/80 p-6 backdrop-blur-sm transition-all
                      duration-300 hover:shadow-lg"
                  >
                    <h4 className="mb-3 font-semibold">{faq.q}</h4>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "returns" && (
              <div className="animate-in space-y-4 duration-500 fade-in">
                {[
                  {
                    q: "How are distributions calculated and paid?",
                    a: "APT holders receive 45% of the property's net operating income, distributed monthly via smart contract. Payments are automatic and transparent, with all transactions recorded on the blockchain.",
                  },
                  {
                    q: "What are Bitcoin rewards and how do they work?",
                    a: "Bitcoin rewards are additional yield enhancements paid to early investors and long-term holders. These come from protocol fees and strategic partnerships, typically adding 2-4% to your annual returns.",
                  },
                  {
                    q: "What's the expected annual return?",
                    a: "Target returns vary by property but typically range from 8-12% annually from cash distributions, plus potential Bitcoin rewards. Past performance of pilot properties has exceeded these targets.",
                  },
                ].map((faq, index) => (
                  <Card
                    key={index}
                    className="bg-card/80 p-6 backdrop-blur-sm transition-all
                      duration-300 hover:shadow-lg"
                  >
                    <h4 className="mb-3 font-semibold">{faq.q}</h4>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "technical" && (
              <div className="animate-in space-y-4 duration-500 fade-in">
                {[
                  {
                    q: "Why use Bitcoin's blockchain instead of Ethereum?",
                    a: "Bitcoin's Clarity smart contracts offer superior security and predictability. The Bitcoin network's proven stability and security make it ideal for long-term real estate investments worth millions of dollars.",
                  },
                  {
                    q: "How secure are the smart contracts?",
                    a: "All smart contracts are audited by leading blockchain security firms and use Clarity's deterministic execution model. This eliminates many common vulnerabilities found in other smart contract platforms.",
                  },
                  {
                    q: "What if there's a technical issue with distributions?",
                    a: "Smart contracts include multiple failsafes and manual override capabilities. In the unlikely event of technical issues, our team can ensure distributions continue through backup systems while resolving any problems.",
                  },
                ].map((faq, index) => (
                  <Card
                    key={index}
                    className="bg-card/80 p-6 backdrop-blur-sm transition-all
                      duration-300 hover:shadow-lg"
                  >
                    <h4 className="mb-3 font-semibold">{faq.q}</h4>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
