import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    subject: z.string().min(1, "Please select a subject"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = contactSchema.parse(body)

        if (process.env.RESEND_API_KEY) {
            try {
                const response = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                    },
                    body: JSON.stringify({
                        from: "PropertyX Contact <onboarding@resend.dev>",
                        to: ["propertyx.finance@gmail.com"],
                        reply_to: validatedData.email,
                        subject: `PropertyX Contact Form: ${validatedData.subject}`,
                        html: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                <h2 style="color: #333; border-bottom: 2px solid #5546FF; padding-bottom: 10px;">
                                    New Contact Form Submission
                                </h2>
                                
                                <div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
                                    <p style="margin: 10px 0;"><strong>Name:</strong> ${validatedData.name}</p>
                                    <p style="margin: 10px 0;"><strong>Email:</strong> ${validatedData.email}</p>
                                    <p style="margin: 10px 0;"><strong>Subject:</strong> ${validatedData.subject}</p>
                                </div>
                                
                                <div style="margin: 20px 0;">
                                    <h3 style="color: #333;">Message:</h3>
                                    <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${validatedData.message}</p>
                                </div>
                                
                                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #888;">
                                    <p>This email was sent from the PropertyX contact form.</p>
                                </div>
                            </div>
                        `,
                    }),
                })

                if (response.ok) {
                    const data = await response.json()
                    return NextResponse.json(
                        { message: "Message sent successfully!", data },
                        { status: 200 }
                    )
                }
            } catch (emailError) {
                console.error("Resend API error:", emailError)
            }
        }

        // Fallback: Log the data if email service is not configured or fails
        console.log("=".repeat(60))
        console.log("📧 NEW CONTACT FORM SUBMISSION")
        console.log("=".repeat(60))
        console.log(`Name: ${validatedData.name}`)
        console.log(`Email: ${validatedData.email}`)
        console.log(`Subject: ${validatedData.subject}`)
        console.log(`Message:\n${validatedData.message}`)
        console.log("=".repeat(60))

        return NextResponse.json(
            {
                message: "Message received! We'll get back to you soon.",
                fallback: true,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Contact form error:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid form data", errors: error.issues },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to send message. Please try again." },
            { status: 500 }
        )
    }
}
