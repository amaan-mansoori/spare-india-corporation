"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Catalog", href: "/catalog" },
        { name: "Categories", href: "#categories" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "glass shadow-sm py-4" : "bg-transparent py-6"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container flex items-center justify-between">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tight text-[var(--foreground)]"
                >
                    Spare India{" "}
                    <span className="text-[var(--primary)]">
                        Corporation
                    </span>
                </Link>

                {/* Desktop Menu ONLY */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-[var(--secondary-foreground)] hover:text-[var(--primary)] transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

            </div>
        </motion.nav>
    );
}
