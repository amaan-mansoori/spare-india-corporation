"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import Link from "next/link"; // Ensure correct import if linking internally

export default function Hero() {
    return (
        <section className="min-h-screen pt-20 flex items-center justify-center bg-[var(--background)]">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-base font-semibold">
                        Vidisha’s Best Spare Parts Shop
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--foreground)]">
                        Spare India <span className="text-blue-600">Corporation</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Your one-stop destination for A to Z spare parts.
                        From ACs to Washing Machines, we have everything at the lowest prices.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            href="/catalog"
                            variant="primary"
                            size="lg"
                            className="mt-6 shadow-lg hover:shadow-xl"
                        >
                            Browse Catalog
                        </Button>

                        <Button
                            href="https://wa.me/918269949879"
                            external
                            variant="secondary"
                            size="lg"
                            className="mt-4"
                        >
                            Contact on WhatsApp
                        </Button>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
