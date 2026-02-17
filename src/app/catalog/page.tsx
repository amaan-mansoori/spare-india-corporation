import Navbar from "@/components/Navbar";
import Catalog from "@/components/Catalog";
import Footer from "@/components/Footer";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const category = typeof params.category === "string" ? params.category : undefined;

    return (
        <main className="min-h-screen bg-[var(--background)]">
            <Navbar />
            <div className="pt-20">
                <Catalog initialCategory={category} />
            </div>
            <Footer />
        </main>
    );
}
