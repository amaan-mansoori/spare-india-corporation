const fs = require('fs');
const path = require('path');
const https = require('https');

const downloadDir = path.join(__dirname, '../public/images/categories');

const imagesToDownload = [
    { name: 'ac.jpg', keywords: 'air,conditioner,split,interior' },
    { name: 'refrigerator.jpg', keywords: 'refrigerator,modern,kitchen' },
    { name: 'washing-machine.jpg', keywords: 'washing,machine,laundry,room' },
    { name: 'ac-gas.jpg', keywords: 'refrigerant,gas,cylinders,hvac' },
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
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
}

function getUrl(keywords) {
    return `https://loremflickr.com/800/600/${keywords.replace(/,/g, ',')}/all`;
}

async function run() {
    console.log("Starting category image downloads...");
    for (const item of imagesToDownload) {
        const url = getUrl(item.keywords);
        const filePath = path.join(downloadDir, item.name);
        try {
            await downloadImage(url, filePath);
        } catch (error) {
            console.error(`Failed to download ${item.name}: ${error.message}`);
        }
    }
    console.log("Category downloads completed.");
}

run();
