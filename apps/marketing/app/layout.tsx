import type { Metadata } from "next";
import "@workspace/ui/globals.css";
import Nav from "@/components/nav";
import { ThemeProvider } from "@workspace/ui/components/theme-provider";
import Footer from "@/components/footer";
import WaitlistDialog from "@/components/waitlist-dialog";
import { logoFont } from "@workspace/font";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${logoFont.className} min-h-dvh bg-background
          text-foreground antialiased`}
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
