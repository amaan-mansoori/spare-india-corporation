"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
    {
        src: "/images/gallery/washing-machine-parts.png",
        title: "Washing Machine Parts",
    },
    {
        src: "/images/gallery/spare-parts.png",
        title: "Spare Parts",
    },
    {
        src: "/images/gallery/ac-parts.jpg",
        title: "AC Parts",
    },
    {
        src: "/images/gallery/refrigerator-parts.png",
        title: "Refrigerator Parts",
    },
];

export default function Gallery() {
    return (
        <section className="section-spacing bg-[var(--background)]">

            {/* container */}
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold mb-4 text-[var(--foreground)]">
                        Our Shop Gallery
                    </h2>

                    <p className="text-lg text-[var(--muted)]">
                        Take a look at our shop and spare parts collection
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {images.map((img, index) => (

                        <motion.div
                            key={index}
                            className="group bg-white rounded-3xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-3"
                            whileHover={{ y: -8 }}
                        >

                            {/* Image container */}
                            <div className="relative w-full h-[220px] rounded-2xl overflow-hidden mb-4">

                                <Image
                                    src={img.src}
                                    alt={img.title}
                                    width={400}
                                    height={260}
                                    unoptimized
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />


                            </div>

                            {/* Title BELOW image */}
                            <h3 className="text-lg font-semibold text-center text-[var(--foreground)]">
                                {img.title}
                            </h3>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>
    );
}
