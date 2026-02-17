const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/products.json');

try {
    if (!fs.existsSync(dataPath)) {
        console.error(`Error: File not found at ${dataPath}`);
        process.exit(1);
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const products = JSON.parse(rawData);

    console.log("=== SPARE INDIA CORPORATION - UNIQUE SPARE PART TYPES ===\n");

    const categoryParts = {};

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    products.forEach(p => {
        if (!categoryParts[p.category]) {
            categoryParts[p.category] = new Set();
        }

        let partType = p.name;

        // Remove Brand
        if (p.brand) {
            const brandRegex = new RegExp(`^${escapeRegExp(p.brand)}\\s*`, 'i');
            partType = partType.replace(brandRegex, '');
        }

        // Remove Machine Type
        if (p.machineType) {
            // For AC gas, machineType might be "AC Gas", 
            // product name: "Floron R32 Gas Cylinder"
            // brand: "Floron" -> "R32 Gas Cylinder"
            // machineType: "AC Gas" -> "R32 Gas Cylinder" (doesn't match start)

            // We need to handle machineType removal flexibly. 
            // It might be at the start (after brand removal) or handled differently.
            // Let's try removing it if it appears at the start.
            const machineRegex = new RegExp(`^${escapeRegExp(p.machineType)}\\s*`, 'i');
            partType = partType.replace(machineRegex, '');
        }

        // Clean up extra spaces
        partType = partType.trim();

        if (partType) {
            categoryParts[p.category].add(partType);
        }
    });

    let output = "=== SPARE INDIA CORPORATION - UNIQUE SPARE PART TYPES ===\n\n";

    for (const category in categoryParts) {
        const partsSet = categoryParts[category];
        output += `${category}:\n`;
        output += `(Total Unique Types: ${partsSet.size})\n`;

        const sortedParts = Array.from(partsSet).sort();
        sortedParts.forEach(part => {
            output += `* ${part}\n`;
        });
        output += "\n";
    }

    const outputPath = path.join(__dirname, '../unique_parts_output.txt');
    fs.writeFileSync(outputPath, output);
    console.log(`Analysis written to ${outputPath}`);

} catch (error) {
    console.error("An error occurred:", error);
}
