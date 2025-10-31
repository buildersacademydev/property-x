import type { Metadata } from "next";
import "@workspace/ui/globals.css";
import RootProviders from "@/providers/root-providers";
import Nav from "@/components/nav";
import Notifications from "@/components/notifications";
import { Toaster } from "sonner";
import { mainFont } from "@workspace/font";

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
        className={`${mainFont.className} min-h-dvh bg-background
          text-foreground antialiased`}
        suppressHydrationWarning
      >
        <RootProviders>
          <Nav />
          <main className="mt-12">{children}</main>
        </RootProviders>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          duration={3000}
        />
        <Notifications />
      </body>
    </html>
  );
}
