"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
    external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", href, external, children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

        const variants = {
            primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-lg shadow-blue-500/30",
            secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[#e5e5ea]",
            outline: "border border-[var(--border)] bg-transparent hover:bg-[var(--secondary)]",
            ghost: "bg-transparent hover:bg-[var(--secondary)] text-[var(--foreground)]",
        };

        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg",
        };

        const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

        if (href) {
            if (external) {
                return (
                    <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer">
                        {children}
                    </a>
                );
            }
            return (
                <Link href={href} className={combinedClasses}>
                    {children}
                </Link>
            );
        }

        return (
            <motion.button
                ref={ref}
                className={combinedClasses}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
