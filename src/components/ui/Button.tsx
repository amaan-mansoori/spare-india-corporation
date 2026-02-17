"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: "default" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
}

export default function Button({
    children,
    onClick,
    className,
    variant = "default",
    size = "md",
    href,
}: ButtonProps) {

    const base =
        "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300";

    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
        outline: "border border-gray-300 hover:bg-gray-100",
        ghost: "hover:bg-gray-100",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const combinedClasses = clsx(
        base,
        variants[variant],
        sizes[size],
        className
    );

    if (href) {
        return (
            <motion.a
                href={href}
                className={combinedClasses}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
            >
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button
            onClick={onClick}
            className={combinedClasses}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
        >
            {children}
        </motion.button>
    );
}
