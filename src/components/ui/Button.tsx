"use client";

import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    className?: string;
    onClick?: () => void;
}

export function Button({ children, href, className = "", onClick }: ButtonProps) {

    const styles =
        "inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition";

    if (href) {
        return (
            <a href={href} className={styles + " " + className}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={styles + " " + className}>
            {children}
        </button>
    );
}
