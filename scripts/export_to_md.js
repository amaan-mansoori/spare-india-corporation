const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/products.json');
const outputPath = 'C:/Users/manso/.gemini/antigravity/brain/ca3ecd7d-fa42-46b4-869a-17d1b07f9b1d/product_dataset.md';
const rawData = fs.readFileSync(dataPath, 'utf-8');
const products = JSON.parse(rawData);

let md = "# Spare India Cool - Product Dataset Export\n\n";

// 1. Total Number
md += `**Total Products:** ${products.length}\n\n`;

// 3. Summary Counts
const counts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
}, {});

md += "## Summary Counts\n";
md += `* **AC Spare Parts:** ${counts['AC Spare Parts'] || 0}\n`;
md += `* **Refrigerator Spare Parts:** ${counts['Refrigerator Spare Parts'] || 0}\n`;
md += `* **Washing Machine Spare Parts:** ${counts['Washing Machine Spare Parts'] || 0}\n`;
md += `* **AC Gas Cylinders:** ${counts['AC Gas Cylinders'] || 0}\n\n`;

// 4. Grouped by Category
md += "## Products Grouped by Category\n";
const grouped = products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p.name);
    return acc;
}, {});

for (const [cat, names] of Object.entries(grouped)) {
    md += `### ${cat}\n`;
    names.forEach(n => md += `* ${n}\n`);
    md += "\n";
}

// 2. Full Structured List
md += "## Full Structured List\n";
md += "| Product Name | Category | Brand | Machine Type | Image Path |\n";
md += "|---|---|---|---|---|\n";
products.forEach(p => {
    md += `| ${p.name} | ${p.category} | ${p.brand} | ${p.machineType} | ${p.image} |\n`;
});
md += "\n";

// 5. Full Raw JSON
md += "## Full products.json Content\n";
md += "```json\n";
md += rawData;
md += "\n```\n";

fs.writeFileSync(outputPath, md);
console.log(`Exported to ${outputPath}`);
