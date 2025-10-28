import Link from "next/link"

import { Icons, TIconName } from "@workspace/ui/components/icons"
import { cn } from "@workspace/ui/lib/utils"

type BaseProps = {
    children: React.ReactNode
    icon: TIconName
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    className?: string
}

type WithRedirect = {
    showRedirect: true
    redirectUrl: string
}

type WithoutRedirect = {
    showRedirect?: false
    redirectUrl?: never
}

type ProfileLinkProps = BaseProps & (WithRedirect | WithoutRedirect)

const ProfileLink = ({
    children,
    icon,
    showRedirect = false,
    redirectUrl,
    onClick,
    className,
}: ProfileLinkProps) => {
    const IconComp = Icons[icon]
    const parentClasses = "group flex w-full cursor-pointer items-center justify-between gap-x-2 rounded-xs px-3 py-4 text-muted-foreground hover:bg-accent hover:text-accent-foreground"

    if (showRedirect) {
        return (
            <Link
                href={redirectUrl!}
                className={parentClasses}
                onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
            >
                <div className="flex items-center gap-x-2 hover:transition-transform">
                    <IconComp size={16} className="text-inherit" />
                    <span className="text-sm group-hover:font-medium">
                        {children}
                    </span>
                </div>
                <Icons.moveRight
                    size={16}
                    className="hidden group-hover:block hover:transition-transform"
                />
            </Link>
        )
    }

    return (
        <button type="button" onClick={onClick} className={cn(parentClasses, className)}>
            <div className="flex items-center gap-x-2 hover:transition-transform">
                <IconComp size={16} className="text-inherit" />
                <span className="text-sm group-hover:font-medium">
                    {children}
                </span>
            </div>
        </button>
    )
}

export default ProfileLink
