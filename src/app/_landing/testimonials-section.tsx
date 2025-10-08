import { Card } from "@/components/ui/card"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-balance">
              What Our Community Says
            </h2>
            <p
              className="mx-auto max-w-3xl text-xl text-pretty
                text-muted-foreground"
            >
              Real stories from property owners and investors who&apos;ve
              experienced PropertyX
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="mb-16 grid gap-8 lg:grid-cols-3">
            {[
              {
                name: "David Chen",
                role: "Property Owner, San Francisco",
                rating: 5,
                text: "PropertyX helped me unlock $300k from my duplex without losing ownership. The process was smooth, and I'm earning more from the APT distributions than I was from rent alone.",
                avatar: "DC",
              },
              {
                name: "Sarah Williams",
                role: "Real Estate Investor",
                rating: 5,
                text: "I've been investing in REITs for years, but PropertyX gives me the control I've always wanted. I can choose specific properties and the returns are significantly better.",
                avatar: "SW",
              },
              {
                name: "Michael Torres",
                role: "Property Developer, Austin",
                rating: 5,
                text: "The Bitcoin rewards are a game-changer. Not only do I get steady cash flow from my tokenized properties, but the BTC bonuses have added an extra 15% to my annual returns.",
                avatar: "MT",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-card/80 p-6 backdrop-blur-sm transition-all
                  duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center justify-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center
                      rounded-full bg-gradient-to-br from-primary/30
                      to-secondary/30 text-lg font-semibold text-primary
                      shadow-inner"
                  >
                    {testimonial.avatar}
                  </div>
                </div>
                <div className="mb-4 flex items-center justify-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div
                      key={i}
                      className="flex h-5 w-5 items-center justify-center
                        rounded-full bg-primary"
                    >
                      <span className="text-xs text-primary-foreground">★</span>
                    </div>
                  ))}
                </div>
                <blockquote
                  className="mb-6 text-center text-lg text-muted-foreground
                    italic"
                >
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
                <div className="text-center">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
