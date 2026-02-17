const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/products.json');
const rawData = fs.readFileSync(dataPath, 'utf-8');
const products = JSON.parse(rawData);

console.log("=== SPARE INDIA COOL - PRODUCT DATASET EXPORT ===\n");

// 1. Total Number
console.log(`Total Products: ${products.length}\n`);

// 3. Summary Counts
const counts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
}, {});

console.log("=== SUMMARY COUNTS ===");
console.log(`Total AC Spare Parts: ${counts['AC Spare Parts'] || 0}`);
console.log(`Total Refrigerator Spare Parts: ${counts['Refrigerator Spare Parts'] || 0}`);
console.log(`Total Washing Machine Spare Parts: ${counts['Washing Machine Spare Parts'] || 0}`);
console.log(`Total AC Gas Cylinders: ${counts['AC Gas Cylinders'] || 0}`);
console.log("\n");

// 4. Grouped by Category
console.log("=== PRODUCTS GROUPED BY CATEGORY ===");
const grouped = products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p.name);
    return acc;
}, {});

for (const [cat, names] of Object.entries(grouped)) {
    console.log(`\n--- ${cat} (${names.length}) ---`);
    // Limiting display to first 10 for brevity in "Grouped" view if it's too long, 
    // but user asked for "full list" in point 2. Point 4 implies a list. 
    // I will show all for point 4 as requested.
    names.forEach(n => console.log(`* ${n}`));
}
console.log("\n");

// 2. Full Structured List
console.log("=== FULL STRUCTURED LIST ===");
console.log("Product Name | Category | Brand | Machine Type | Image Path");
console.log("-".repeat(80));
products.forEach(p => {
    console.log(`${p.name} | ${p.category} | ${p.brand} | ${p.machineType} | ${p.image}`);
});
console.log("\n");

// 5. Raw JSON (Truncated for display if too massive, but User asked for full content)
// I will just print it at the end.
