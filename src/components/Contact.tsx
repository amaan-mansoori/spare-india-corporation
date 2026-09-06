"use client";

import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "./ui/Button";

export default function Contact() {
    return (
        <section id="contact" className="py-24 bg-[var(--background)]">
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl font-bold mb-6">Visit Our Shop</h2>
                    <p className="text-[var(--muted)] mb-8 text-lg">
                        Come visit us at our store in Vidisha or contact us via WhatsApp for instant queries.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-blue-50 text-[var(--primary)]">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Address</h3>
                                <p className="text-[var(--muted)]">
                                    Spare India Corporation<br />
                                    Vidisha, Madhya Pradesh<br />
                                    Coordinates: 23°31'16.8"N 77°48'08.7"E
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-green-50 text-green-600">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Contact Info</h3>
                                <p className="text-[var(--muted)]">+91 8269949879</p>
                                <p className="text-[var(--muted)]">Owner: Ubaid Mansoori</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button href="https://wa.me/918269949879" external size="lg" className="w-full sm:w-auto">
                                <MessageCircle className="mr-2" /> Chat on WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-lg border border-[var(--border)] relative bg-gray-100">
                    {/* Google Map Embed */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3656.915878486064!2d77.80023607533036!3d23.521333378828987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDMxJzE2LjgiTiA3N8KwNDgnMDguNyJF!5e0!3m2!1sen!2sin!4v1708170000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    );
}
