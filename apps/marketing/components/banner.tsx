"use client";

import { cn } from "@workspace/ui/lib/utils";
import { Icons } from "@workspace/ui/components/icons";
import { motion, type Easing } from "motion/react";
import Link from "next/link";
import type { Route } from "next";

const ease: Easing = [0.16, 1, 0.3, 1];

interface BannerProps {
    text: string;
    href?: string;
    className?: string;
}

const Sparkles = () => (
    <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <motion.path
            d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
            }}
        />
        <motion.path
            d="M19 14L19.5 16.5L22 17L19.5 17.5L19 20L18.5 17.5L16 17L18.5 16.5L19 14Z"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                delay: 0.5,
                ease: "easeInOut",
            }}
        />
        <motion.path
            d="M6 14L6.5 16.5L9 17L6.5 17.5L6 20L5.5 17.5L3 17L5.5 16.5L6 14Z"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                delay: 0.3,
                ease: "easeInOut",
            }}
        />
    </svg>
);

export default function Banner({ text, href, className }: BannerProps) {
    const content = (
        <motion.div
            className={cn(
                "group relative inline-flex items-center gap-2 rounded-full",
                "border border-primary/20 bg-primary/5 px-4 py-1.5",
                "backdrop-blur-sm transition-all duration-300",
                "hover:border-primary/80 bg-primary/10 hover:bg-primary/20 shadow-lg shadow-primary/20 cursor-pointer",
                className
            )}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease }}
            whileHover={{ scale: 1.02 }}
        >
            <div className="absolute inset-0 -z-10 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-full border-2 border-primary/60" />
            </div>

            <motion.div
                className="text-primary"
                animate={{
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Sparkles />
            </motion.div>

            <span className="text-sm font-medium text-foreground">
                {text}
            </span>

            {href && (
                <Icons.externalLink className="h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
        </motion.div>
    );

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
            >
                {content}
            </a>
        );
    }

    return content;
}