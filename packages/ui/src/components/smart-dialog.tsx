"use client"

import * as React from "react"

import { useMediaQuery } from "@workspace/ui/hooks/use-media-query"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { cn } from "@workspace/ui/lib/utils"

interface BaseProps {
    children: React.ReactNode
}

interface RootSmartDialogProps extends BaseProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

interface SmartDialogProps extends BaseProps {
    className?: string
    asChild?: true
    [key: string]: any
}

const SmartDialogContext = React.createContext<{ isDesktop: boolean }>({
    isDesktop: false,
});

const useSmartDialogContext = () => {
    const context = React.useContext(SmartDialogContext);
    if (!context) {
        throw new Error(
            "SmartDialog components cannot be rendered outside the SmartDialog Context",
        );
    }
    return context;
};

const SmartDialog = ({ children, ...props }: RootSmartDialogProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const SmartDialog = isDesktop ? Dialog : Drawer;

    return (
        <SmartDialogContext.Provider value={{ isDesktop }}>
            <SmartDialog {...props} {...(!isDesktop && { autoFocus: true })}>
                {children}
            </SmartDialog>
        </SmartDialogContext.Provider>
    );
};


const SmartDialogTrigger = ({ className, children, ...props }: SmartDialogProps) => {
    const { isDesktop } = useSmartDialogContext();
    const SmartDialogTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

    return (
        <SmartDialogTrigger className={className} {...props}>
            {children}
        </SmartDialogTrigger>
    );
};

const SmartDialogClose = ({ className, children, ...props }: SmartDialogProps) => {
    const { isDesktop } = useSmartDialogContext();
    const SmartDialogClose = isDesktop ? DialogClose : DrawerClose;

    return (
        <SmartDialogClose className={className} {...props}>
            {children}
        </SmartDialogClose>
    );
};

const SmartDialogContent = ({ className, children, ...props }: SmartDialogProps) => {
    const { isDesktop } = useSmartDialogContext();
    const SmartDialogContent = isDesktop ? DialogContent : DrawerContent;

    return (
        <SmartDialogContent className={className} {...props}>
            {children}
        </SmartDialogContent>
    );
};

const SmartDialogDescription = ({
    className,
    children,
    ...props
}: SmartDialogProps) => {
    const { isDesktop } = useSmartDialogContext();
    const SmartDialogDescription = isDesktop ? DialogDescription : DrawerDescription;

    return (
        <SmartDialogDescription className={className} {...props}>
            {children}
        </SmartDialogDescription>
    );
};

const SmartDialogHeader = ({ className, children, ...props }: SmartDialogProps) => {
    const { isDesktop } = useSmartDialogContext();
    const SmartDialogHeader = isDesktop ? DialogHeader : DrawerHeader;

    return (
        <SmartDialogHeader className={className} {...props}>
            {children}
        </SmartDialogHeader>
    );
};

const SmartDialogTitle = ({ className, children, ...props }: SmartDialogProps) => {
    const { isDesktop } = useSmartDialogContext();
    const SmartDialogTitle = isDesktop ? DialogTitle : DrawerTitle;

    return (
        <SmartDialogTitle className={className} {...props}>
            {children}
        </SmartDialogTitle>
    );
};

const SmartDialogBody = ({ className, children, ...props }: SmartDialogProps) => {
    return (
        <div className={cn("px-4 md:px-0", className)} {...props}>
            {children}
        </div>
    );
};

const SmartDialogFooter = ({ className, children, ...props }: SmartDialogProps) => {
    const { isDesktop } = useSmartDialogContext();
    const SmartDialogFooter = isDesktop ? DialogFooter : DrawerFooter;

    return (
        <SmartDialogFooter className={className} {...props}>
            {children}
        </SmartDialogFooter>
    );
};

export {
    SmartDialog,
    SmartDialogTrigger,
    SmartDialogClose,
    SmartDialogContent,
    SmartDialogDescription,
    SmartDialogHeader,
    SmartDialogTitle,
    SmartDialogBody,
    SmartDialogFooter,
}
