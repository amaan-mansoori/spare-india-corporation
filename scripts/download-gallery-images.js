const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    { name: 'shop-front.jpg', text: 'Shop Front' },
    { name: 'store-interior.jpg', text: 'Store Interior' },
    { name: 'spare-parts.jpg', text: 'Spare Parts' },
    { name: 'ac-parts.jpg', text: 'AC Parts' }
];

const downloadImage = (filename, text) => {
    const url = `https://placehold.co/800x600/png?text=${encodeURIComponent(text)}`;
    const filePath = path.join(__dirname, '../public/images/gallery', filename);

    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${filename}`);
        });
    }).on('error', (err) => {
        fs.unlink(filename);
        console.error(`Error downloading ${filename}: ${err.message}`);
    });
};

images.forEach(img => downloadImage(img.name, img.text));
