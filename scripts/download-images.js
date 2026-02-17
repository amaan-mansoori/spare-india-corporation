const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const downloadDir = path.join(__dirname, '../public/images/products');

const imagesToDownload = [
    // AC Parts
    { category: 'ac', name: 'compressor.jpg', keywords: 'air,conditioner,compressor' },
    { category: 'ac', name: 'fan-motor.jpg', keywords: 'electric,fan,motor' },
    { category: 'ac', name: 'capacitor.jpg', keywords: 'capacitor,electronics' },
    { category: 'ac', name: 'pcb-board.jpg', keywords: 'circuit,board,pcb' },
    { category: 'ac', name: 'thermistor.jpg', keywords: 'temperature,sensor,thermistor' },
    { category: 'ac', name: 'swing-motor.jpg', keywords: 'stepper,motor,small' },
    { category: 'ac', name: 'blower-wheel.jpg', keywords: 'blower,fan,wheel' },
    { category: 'ac', name: 'remote.jpg', keywords: 'ac,remote,control' },
    { category: 'ac', name: 'copper-pipe.jpg', keywords: 'copper,pipe,coil' },
    { category: 'ac', name: 'drain-pipe.jpg', keywords: 'plastic,drain,pipe' },

    // Refrigerator Parts
    { category: 'refrigerator', name: 'compressor.jpg', keywords: 'fridge,compressor' },
    { category: 'refrigerator', name: 'thermostat.jpg', keywords: 'thermostat,dial' },
    { category: 'refrigerator', name: 'defrost-heater.jpg', keywords: 'heating,element,coil' },
    { category: 'refrigerator', name: 'fan-motor.jpg', keywords: 'small,fan,motor' },
    { category: 'refrigerator', name: 'pcb-board.jpg', keywords: 'electronics,circuit,board' },
    { category: 'refrigerator', name: 'door-gasket.jpg', keywords: 'rubber,seal,door' },

    // Washing Machine Parts
    { category: 'washing-machine', name: 'drain-pump.jpg', keywords: 'washing,machine,drain,pump' },
    { category: 'washing-machine', name: 'motor.jpg', keywords: 'washing,machine,motor' },
    { category: 'washing-machine', name: 'inlet-valve.jpg', keywords: 'solenoid,valve,water' },
    { category: 'washing-machine', name: 'timer.jpg', keywords: 'washing,machine,timer,knob' },
    { category: 'washing-machine', name: 'belt.jpg', keywords: 'drive,belt,rubber' },
    { category: 'washing-machine', name: 'shock-absorber.jpg', keywords: 'shock,absorber,spring' },

    // AC Gas
    { category: 'ac-gas', name: 'r32.jpg', keywords: 'refrigerant,cylinder,gas' },
    { category: 'ac-gas', name: 'r410a.jpg', keywords: 'gas,cylinder,tank' },
    { category: 'ac-gas', name: 'r22.jpg', keywords: 'freon,tank' },
    { category: 'ac-gas', name: 'r134a.jpg', keywords: 'r134a,refrigerant' },
];

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        // Ensure directory exists
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    console.log(`Downloaded: ${filepath}`);
                    resolve();
                });
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { }); // Delete the partial file
            reject(err);
        });
    });
}

function getUrl(keywords) {
    // Using loremflickr as it redirects to real images reasonably well based on keywords
    return `https://loremflickr.com/600/600/${keywords.replace(/,/g, ',')}/all`;
}

async function run() {
    console.log("Starting image downloads...");
    for (const item of imagesToDownload) {
        const url = getUrl(item.keywords);
        const filePath = path.join(downloadDir, item.category, item.name);
        try {
            await downloadImage(url, filePath);
        } catch (error) {
            console.error(`Failed to download ${item.name}: ${error.message}`);
        }
    }
    console.log("All downloads completed.");
}

run();
