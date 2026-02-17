const fs = require('fs');
const https = require('https');
const path = require('path');

// URL for placeholder images that are reliable (Placehold.co or similar)
// Or using a different reliable source.
// Since the user wants "Real" images, but automated scraping is failing, 
// I will try to use a reliable public image source or fallback to previous ones from LoremFlickr but with better error handling.

const categories = [
    { name: 'ac.png', url: 'https://cdn-icons-png.flaticon.com/512/911/911409.png' },
    { name: 'refrigerator.png', url: 'https://cdn-icons-png.flaticon.com/512/2662/2662503.png' },
    { name: 'washing-machine.png', url: 'https://cdn-icons-png.flaticon.com/512/2285/2285994.png' },
    { name: 'ac-gas.png', url: 'https://cdn-icons-png.flaticon.com/512/3233/3233515.png' }
];
// Using Flaticon CND icon URL as they are stable for "icons" as requested in the card design prompt ("small real image icon")

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
};

const main = async () => {
    const dir = path.join(__dirname, '../public/images/categories');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    for (const cat of categories) {
        console.log(`Downloading ${cat.name}...`);
        try {
            await downloadImage(cat.url, path.join(dir, cat.name));
            console.log(`Saved ${cat.name}`);
        } catch (e) {
            console.error(`Error downloading ${cat.name}:`, e.message);
        }
    }
};

main();
