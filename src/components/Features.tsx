"use client";

import { motion } from "framer-motion";
import { CheckCircle, Truck, ShieldCheck, Phone } from "lucide-react";

const features = [
    {
        icon: CheckCircle,
        title: "Best Price in Vidisha",
        description: "We guarantee the lowest prices for genuine spare parts in the entire city."
    },
    {
        icon: ShieldCheck,
        title: "Genuine Quality",
        description: "100% authentic spare parts for all major brands like LG, Samsung, and Voltas."
    },
    {
        icon: Truck,
        title: "Huge Inventory",
        description: "A to Z parts available. If we don't have it, we arrange it for you."
    },
    {
        icon: Phone,
        title: "Fast Support",
        description: "Instant response on WhatsApp. Get prices and availability in seconds."
    },
];

export default function Features() {
    return (
        <section className="section-spacing bg-[var(--background)]">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
                    <p className="text-[var(--muted)]">We are the most trusted spare parts shop in the region.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--border)]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[var(--primary)]">
                                <feature.icon size={28} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                            <p className="text-[var(--muted)] leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
