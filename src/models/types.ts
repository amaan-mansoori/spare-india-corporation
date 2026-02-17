export interface Product {
    id: number;
    name: string;
    brand: string;
    category: string;
    machineType: string;
    image: string;
    description?: string;
}

export type Category = "AC Spare Parts" | "Refrigerator Spare Parts" | "Washing Machine Spare Parts" | "AC Gas Cylinders";

export interface FilterState {
    category: string;
    brand: string;
    machineType: string;
    search: string;
}
