"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    external?: boolean;
}

export function Button({
    children,
    href,
    onClick,
    className = "",
    variant = "primary",
    size = "md",
    external = false,
}: ButtonProps) {

    const baseStyles =
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300";

    const variants = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-700 shadow-md",

        secondary:
            "bg-gray-100 text-gray-900 hover:bg-gray-200",

        ghost:
            "bg-transparent text-gray-700 hover:bg-gray-100",

        outline:
            "border border-gray-300 text-gray-800 hover:bg-gray-100",
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-5 py-3 text-base",
        lg: "px-6 py-4 text-lg",
    };

    const combinedClasses =
        baseStyles + " " +
        variants[variant] + " " +
        sizes[size] + " " +
        className;

    if (href && external) {
        return (
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={combinedClasses}
                whileHover={{ scale: 1.05 }}
            >
                {children}
            </motion.a>
        );
    }

    if (href) {
        return (
            <Link href={href}>
                <motion.span
                    className={combinedClasses}
                    whileHover={{ scale: 1.05 }}
                >
                    {children}
                </motion.span>
            </Link>
        );
    }

    return (
        <motion.button
            onClick={onClick}
            className={combinedClasses}
            whileHover={{ scale: 1.05 }}
        >
            {children}
        </motion.button>
    );
}
