"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/Button";
import { generateWhatsAppLink } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { Product } from "@/models/types";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const whatsappLink = generateWhatsAppLink(product);

    return (
        <motion.div
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-[var(--border)] shadow-sm transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
        >
            {/* IMAGE CONTAINER */}
            <div className="relative aspect-square overflow-hidden bg-[var(--secondary)]">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col p-5">

                {/* BADGES */}
                <div className="mb-2">
                    <span className="inline-block rounded-full bg-[var(--secondary)] px-2 py-1 text-xs font-semibold text-[var(--secondary-foreground)]">
                        {product.brand}
                    </span>

                    <span className="ml-2 inline-block rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        {product.machineType}
                    </span>
                </div>

                {/* PRODUCT NAME */}
                <h3 className="mb-2 text-lg font-bold text-[var(--foreground)] line-clamp-2">
                    {product.name}
                </h3>

                {/* WHATSAPP BUTTON */}
                <div className="mt-auto pt-4">
                    <Button
                        href={whatsappLink}
                        external
                        className="w-full gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-none"
                        size="md"
                    >
                        <MessageCircle size={18} />
                        Ask Price & Availability
                    </Button>
                </div>

            </div>
        </motion.div>
    );
}
