import * as React from "react"
import { Icons } from "@workspace/ui/components/icons"

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
    const Building = Icons.building
    return (
        <a
            href={"/"}
            className={`flex items-center gap-2 ${className}`}
            aria-label="PropertyX Logo"
        >
            <span
                className="flex h-8 w-8 items-center justify-center rounded-lg
          bg-primary"
            >
                <Building
                    className={`h-5 w-5 text-primary-foreground ${iconClassName}`}
                />
            </span>
            {withText && (
                <span className={`text-xl font-bold tracking-tight ${textClassName}`}>
                    PropertyX
                </span>
            )}
        </a>
    )
}

export default Logo
