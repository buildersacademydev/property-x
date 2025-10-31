import * as React from "react"
import { Icons } from "@workspace/ui/components/icons"
import { logoFont } from "@workspace/font";
import { cn } from "@workspace/ui/lib/utils";

interface LogoProps {
    withText?: boolean
    className?: string
    iconClassName?: string
    textClassName?: string
}

const Logo: React.FC<LogoProps> = ({
    withText = true,
    className = "",
    iconClassName = "",
    textClassName = "",
}) => {
    const LOGO = Icons.logoPropertyX
    return (
        <a
            href={"/"}
            className={cn("flex items-center justify-center gap-2", className, logoFont.className)}
            aria-label="PropertyX Logo"
        >
            {withText && (
                <span className={cn("text-2xl -mr-2 text-center font-extrabold uppercase text-[#FF751F] tracking-widest", textClassName)}>
                    Property
                </span>
            )}
            <span
                className="flex h-8 w-8 items-center justify-center rounded-lg"
            >
                <LOGO
                    className={cn("h-6 w-6 text-primary-foreground", iconClassName)}
                />
            </span>

        </a>
    )
}

export default Logo
