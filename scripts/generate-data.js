const fs = require('fs');
const path = require('path');

const brands = [
  "LG", "Samsung", "Whirlpool", "Voltas", "Daikin", "Godrej",
  "Panasonic", "Hitachi", "Blue Star", "Haier", "IFB", "Bosch",
  "Onida", "Videocon", "Lloyd"
];

const categories = {
  "AC Spare Parts": {
    path: "ac",
    types: ["Split AC", "Window AC"],
    parts: [
      { name: "Compressor", image: "compressor.jpg" },
      { name: "Fan Motor", image: "fan-motor.jpg" },
      { name: "Capacitor", image: "capacitor.jpg" },
      { name: "PCB Board", image: "pcb-board.jpg" },
      { name: "Thermistor", image: "thermistor.jpg" },
      { name: "Swing Motor", image: "swing-motor.jpg" },
      { name: "Blower Wheel", image: "blower-wheel.jpg" },
      { name: "Remote Control", image: "remote-control.jpg" },
      { name: "Copper Pipe", image: "copper-pipe.jpg" },
      { name: "Drain Pipe", image: "drain-pipe.jpg" }
    ]
  },
  "Refrigerator Spare Parts": {
    path: "refrigerator",
    types: ["Single Door Refrigerator", "Double Door Refrigerator"],
    parts: [
      { name: "Compressor", image: "compressor.jpg" },
      { name: "Thermostat", image: "thermostat.jpg" },
      { name: "Defrost Heater", image: "defrost-heater.jpg" },
      { name: "Fan Motor", image: "fan-motor.jpg" },
      { name: "PCB Board", image: "pcb-board.jpg" },
      { name: "Door Gasket", image: "door-gasket.jpg" }
    ]
  },
  "Washing Machine Spare Parts": {
    path: "washing-machine",
    types: ["Front Load Washing Machine", "Top Load Washing Machine"],
    parts: [
      { name: "Drain Pump", image: "drain-pump.jpg" },
      { name: "Wash Motor", image: "motor.jpg" },
      { name: "Inlet Valve", image: "inlet-valve.jpg" },
      { name: "Timer", image: "timer.jpg" },
      { name: "Belt", image: "belt.jpg" },
      { name: "Shock Absorber", image: "shock-absorber.jpg" }
    ]
  },
  "AC Gas Cylinders": {
    path: "ac-gas",
    types: ["Refrigerant Gas"],
    parts: [
      { name: "R32 Gas Cylinder", image: "r32.jpg" },
      { name: "R410A Gas Cylinder", image: "r410a.jpg" },
      { name: "R22 Gas Cylinder", image: "r22.jpg" },
      { name: "R134a Gas Can", image: "r134a.jpg" }
    ]
  }
};

const products = [];
let id = 1;

// Generate items
for (const [categoryName, data] of Object.entries(categories)) {
  const { path: catPath, types, parts } = data;

  if (categoryName === "AC Gas Cylinders") {
    const gasBrands = ["Floron", "Mafron", "Refrigerant", "Honeywell", "Godrej", "Value", "Generic"];
    // For Gas, parts list contains specific gas types
    for (const part of parts) {
      for (const brand of gasBrands) {
        products.push({
          id: id++,
          name: `${brand} ${part.name}`,
          brand: brand,
          category: categoryName,
          machineType: "AC Gas",
          image: `/images/products/${catPath}/${part.image}`
        });
      }
    }
  } else {
    // Normal parts
    for (const brand of brands) {
      for (const machineType of types) {
        for (const part of parts) {
          products.push({
            id: id++,
            name: `${brand} ${machineType} ${part.name}`,
            brand: brand,
            category: categoryName,
            machineType: machineType,
            image: `/images/products/${catPath}/${part.image}`
          });
        }
      }
    }
  }
}

console.log(`Generated ${products.length} products.`);

const outputPath = path.join(__dirname, '../data/products.json');
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
console.log(`Successfully wrote to ${outputPath}`);
