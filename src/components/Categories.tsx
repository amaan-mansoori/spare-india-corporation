"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
    { title: "AC Spares", image: "/images/categories/ac.png", link: "/catalog?category=AC%20Spare%20Parts", color: "bg-blue-50 text-blue-900" },
    { title: "Refrigerator Spares", image: "/images/categories/refrigerator.png", link: "/catalog?category=Refrigerator%20Spare%20Parts", color: "bg-green-50 text-green-900" },
    { title: "Washing Machine Spares", image: "/images/categories/washing-machine.png", link: "/catalog?category=Washing%20Machine%20Spare%20Parts", color: "bg-purple-50 text-purple-900" },
    { title: "AC Gas", image: "/images/categories/ac-gas.png", link: "/catalog?category=AC%20Gas%20Cylinders", color: "bg-orange-50 text-orange-900" },
];

export default function Categories() {
    return (
        <section id="categories" className="section-spacing bg-[var(--background)]">
            <div className="container">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                        Shop by Category
                    </h2>
                    <p className="mt-4 text-lg text-[var(--muted)]">
                        Explore our wide range of spare parts.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat, idx) => (
                        <Link href={cat.link} key={idx}>
                            <motion.div
                                className={`group cursor-pointer rounded-[24px] ${cat.color} p-8 text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.04] flex flex-col items-center h-[320px]`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-bold mb-0">
                                    {cat.title}
                                </h3>

                                <div className="flex-1 flex items-center justify-center w-full mt-6">
                                    <div className="relative h-[100px] w-[100px]">
                                        <img
                                            src={cat.image}
                                            alt={cat.title}
                                            width="100"
                                            height="100"
                                            className="object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                </div>

                                {/* Visual balance spacer if needed, or flex-1 handles it */}
                                <div className="h-4" />
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
