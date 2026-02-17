export default function Footer() {
    return (
        <footer className="bg-[#f5f5f7] py-12 border-t border-[var(--border)]">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">Spare India <span className="text-[var(--primary)]">Corporation</span></h2>
                    <p className="text-[var(--muted)] max-w-sm mb-4">
                        Vidisha’s Best Spare Parts Shop using lowest prices. providing A to Z spare parts for AC, Refrigerator, and Washing Machine using high quality.
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                        © {new Date().getFullYear()} Spare India Corporation. All rights reserved.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Categories</h3>
                    <ul className="space-y-2 text-[var(--muted)]">
                        <li>AC Spare Parts</li>
                        <li>Refrigerator Parts</li>
                        <li>Washing Machine Parts</li>
                        <li>AC Gas Cylinders</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-[var(--muted)]">
                        <li>Owner: Shahrukh (Ubaid) Mansoori</li>
                        <li>Phone: +91 8269949879</li>
                        <li>Vidisha, Madhya Pradesh</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
