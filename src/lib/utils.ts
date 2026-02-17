export function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

export function generateWhatsAppLink(product: { name: string }, phone: string = "918269949879") {
    const text = `Hello I want to ask about this spare part: ${product.name}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
