"use client";

import React from "react";
import clsx from "clsx";

export interface ButtonProps {
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

    const base =
        "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-900",
        outline: "border border-gray-300 hover:bg-gray-100 text-gray-900",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-6 py-3 text-lg",
    };

    const combined = clsx(base, variants[variant], sizes[size], className);

    if (href) {
        return (
            <a
                href={href}
                className={combined}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
            >
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={combined}>
            {children}
        </button>
    );
}
