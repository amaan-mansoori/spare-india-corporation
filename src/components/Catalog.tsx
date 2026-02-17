"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/models/types";
import { Button } from "./ui/Button";
import { Search, Filter, X } from "lucide-react";
import productsData from "../../data/products.json";

// Extract unique values for filters
const allProducts = productsData as Product[];
const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category)));
const uniqueBrands = Array.from(new Set(allProducts.map(p => p.brand)));
const uniqueTypes = Array.from(new Set(allProducts.map(p => p.machineType)));

interface CatalogProps {
    initialCategory?: string;
}

export default function Catalog({ initialCategory }: CatalogProps) {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(initialCategory || "");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [visibleCount, setVisibleCount] = useState(24);

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
            const matchesType = selectedType ? product.machineType === selectedType : true;
            return matchesSearch && matchesCategory && matchesBrand && matchesType;
        });
    }, [search, selectedCategory, selectedBrand, selectedType]);

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 24);
    };

    const clearFilters = () => {
        setSearch("");
        setSelectedCategory("");
        setSelectedBrand("");
        setSelectedType("");
        setVisibleCount(24);
    };

    return (
        <section className="py-12 bg-[var(--secondary)] min-h-screen">
            <div className="container">
                {/* Header & Controls */}
                <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-2">Product Catalog</h1>
                        <p className="text-[var(--muted)]">Showing {filteredProducts.length} results</p>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row md:items-center w-full lg:w-auto">
                        {/* Search */}
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full rounded-xl border border-[var(--border)] pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <select
                            className="rounded-xl border border-[var(--border)] px-4 py-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        <select
                            className="rounded-xl border border-[var(--border)] px-4 py-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white"
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                        >
                            <option value="">All Brands</option>
                            {uniqueBrands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>

                        {(selectedCategory || selectedBrand || selectedType || search) && (
                            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                <X size={16} className="mr-1" /> Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Grid */}
                {visibleProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {visibleProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-6">
                            <Search size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold">No products found</h3>
                        <p className="text-[var(--muted)]">Try adjusting your search or filters.</p>
                        <Button variant="outline" className="mt-6" onClick={clearFilters}>Clear Filters</Button>
                    </div>
                )}

                {/* Load More */}
                {visibleProducts.length < filteredProducts.length && (
                    <div className="mt-12 text-center">
                        <Button onClick={handleLoadMore} size="lg" variant="outline">
                            Load More Products
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
