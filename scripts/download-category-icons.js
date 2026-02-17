const fs = require('fs');
const https = require('https');
const path = require('path');

const categories = [
    { name: 'ac.png', query: 'air conditioner icon png' },
    { name: 'refrigerator.png', query: 'refrigerator icon png' },
    { name: 'washing-machine.png', query: 'washing machine icon png' },
    { name: 'ac-gas.png', query: 'gas cylinder icon png' }
];

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
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

// Using placeholder services that support text/icons or simple images since real transparent PNG search requires API keys
// For this task, we will use high quality placeholder images that look like icons/products
const downloadAll = async () => {
    const dir = path.join(__dirname, '../public/images/categories');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    for (const cat of categories) {
        // Using LoremFlickr completely different keywords to get distinct images
        // Or using a reliable placeholder service.
        // Let's use LoremFlickr with specific keywords for appliances.
        const url = `https://loremflickr.com/320/320/${encodeURIComponent(cat.query.replace(' icon png', ' appliance'))}/all`;

        console.log(`Downloading ${cat.name}...`);
        try {
            await downloadImage(url, path.join(dir, cat.name));
            console.log(`Saved ${cat.name}`);
        } catch (e) {
            console.error(`Failed to download ${cat.name}:`, e);
        }
    }
};

downloadAll();
