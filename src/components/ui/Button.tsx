"use client";

import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    external?: boolean;
    onClick?: () => void;
    className?: string;
    variant?: "primary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
}

export function Button({
    children,
    href,
    external = false,
    onClick,
    className = "",
    variant = "primary",
    size = "md",
}: ButtonProps) {

    // base styles
    const base =
        "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95";

    // variant styles
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        ghost: "text-gray-600 hover:bg-gray-100",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    };

    // size styles
    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2 text-base",
        lg: "px-7 py-3 text-lg",
    };

    const combinedClasses = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    // link button
    if (href) {
        return (
            <a
                href={href}
                target={external ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={combinedClasses}
            >
                {children}
            </a>
        );
    }

    // normal button
    return (
        <button onClick={onClick} className={combinedClasses}>
            {children}
        </button>
    );
}
