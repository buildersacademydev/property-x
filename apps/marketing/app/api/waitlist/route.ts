import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/db/drizzle"
import { waitlist } from "@/db/schema"
import { eq } from "drizzle-orm"

const waitlistSchema = z.object({
    email: z.email("Please enter a valid email address").min(1, "Email is required"),
    walletAddress: z
        .string()
        .min(1, "Wallet address is required")
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = waitlistSchema.parse(body)

        if (!process.env.DATABASE_URL_MARKETING) {
            console.log("=".repeat(60))
            console.log("📝 NEW WAITLIST SUBMISSION (NO DATABASE)")
            console.log("=".repeat(60))
            console.log(`Email: ${validatedData.email}`)
            console.log(`Wallet Address: ${validatedData.walletAddress}`)
            console.log(`Timestamp: ${new Date().toISOString()}`)
            console.log("=".repeat(60))

            return NextResponse.json(
                {
                    message: "Successfully joined the waitlist!",
                    fallback: true,
                },
                { status: 200 }
            )
        }

        const existingEntry = await db
            .select()
            .from(waitlist)
            .where(eq(waitlist.email, validatedData.email))
            .limit(1)

        if (existingEntry.length > 0) {
            return NextResponse.json(
                { message: "This email is already on the waitlist!" },
                { status: 409 }
            )
        }

        const result = await db
            .insert(waitlist)
            .values({
                email: validatedData.email,
                walletAddress: validatedData.walletAddress,
            })
            .returning()

        const newEntry = result[0]

        if (!newEntry) {
            throw new Error("Failed to create waitlist entry")
        }

        console.log("✅ New waitlist entry:", newEntry)

        // Optional: Send confirmation email using Resend
        if (process.env.RESEND_API_KEY) {
            try {
                await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                    },
                    body: JSON.stringify({
                        from: "PropertyX <onboarding@resend.dev>",
                        to: [validatedData.email],
                        subject: "Welcome to PropertyX Waitlist! 🎉",
                        html: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                <h2 style="color: #5546FF; border-bottom: 2px solid #5546FF; padding-bottom: 10px;">
                                    Welcome to PropertyX! 🏠
                                </h2>
                                
                                <div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
                                    <p style="font-size: 16px; line-height: 1.6;">
                                        Thank you for joining our waitlist! You're now part of an exclusive group 
                                        that will get early access to tokenized real estate with transparent yields.
                                    </p>
                                </div>
                                
                                <div style="margin: 20px 0;">
                                    <h3 style="color: #333;">What's Next?</h3>
                                    <ul style="line-height: 1.8; color: #555;">
                                        <li>🚀 Priority access when we launch</li>
                                        <li>🎁 Exclusive launch bonuses</li>
                                        <li>📬 Regular updates on our progress</li>
                                        <li>💎 Early investor opportunities</li>
                                    </ul>
                                </div>
                                
                                <div style="margin: 30px 0; padding: 20px; background-color: #5546FF; color: white; border-radius: 8px; text-align: center;">
                                    <p style="margin: 0; font-size: 14px;">
                                        <strong>Your registered wallet:</strong><br/>
                                        <code style="background-color: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 4px; display: inline-block; margin-top: 10px;">
                                            ${validatedData.walletAddress}
                                        </code>
                                    </p>
                                </div>
                                
                                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #888; text-align: center;">
                                    <p>Follow us on social media for the latest updates!</p>
                                    <p>© ${new Date().getFullYear()} PropertyX. All rights reserved.</p>
                                </div>
                            </div>
                        `,
                    }),
                })
            } catch (emailError) {
                console.error("Failed to send confirmation email:", emailError)
            }
        }

        return NextResponse.json(
            {
                message: "Successfully joined the waitlist!",
                data: {
                    id: newEntry.id,
                    email: newEntry.email,
                },
            },
            { status: 201 }
        )
    } catch (error) {

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid form data", errors: error.issues },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to join waitlist. Please try again." },
            { status: 500 }
        )
    }
}

// GET endpoint to retrieve waitlist count (optional)
export async function GET() {
    try {
        if (!process.env.DATABASE_URL_MARKETING) {
            return NextResponse.json(
                { count: 0, message: "Database not configured" },
                { status: 200 }
            )
        }

        const entries = await db.select().from(waitlist)

        return NextResponse.json(
            {
                count: entries.length,
                message: "Waitlist count retrieved successfully",
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error fetching waitlist count:", error)
        return NextResponse.json(
            { message: "Failed to fetch waitlist count" },
            { status: 500 }
        )
    }
}
