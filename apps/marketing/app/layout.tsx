import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@workspace/ui/globals.css";
import Nav from "@/components/nav";
import { ThemeProvider } from "@workspace/ui/components/theme-provider";
import Footer from "@/components/footer";
import WaitlistDialog from "@/components/waitlist-dialog";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "PropertyX Protocol",
  description: "Tokenize Urban Real-World Assets on PropertyX",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.className} min-h-dvh bg-background
          text-foreground antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Nav />
          <main className="mt-12">{children}</main>
          <Footer />
          <WaitlistDialog />
        </ThemeProvider>
      </body>
    </html>
  );
}
