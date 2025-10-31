import { Poppins, Unbounded } from "next/font/google";

const mainFont = Poppins({
    variable: "--font-main-font",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
})

const logoFont = Unbounded({
    variable: "--font-logo-font",
    subsets: ["latin"],
})

export { mainFont, logoFont };