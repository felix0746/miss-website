const webp = require('webp-converter');
const fs = require('fs');
const path = require('path');

// webp-converter needs this to be enabled
webp.grant_permission();

const imageDir = 'public/images';

const findImagesAndConvert = async () => {
    console.log('Starting image scan and conversion to WebP...');
    const files = fs.readdirSync(imageDir);
    const imagePaths = files
        .filter(file => /\.(png|jpe?g)$/i.test(file))
        .map(file => path.join(imageDir, file));

    console.log(`Found ${imagePaths.length} images to potentially convert.`);

    for (const imagePath of imagePaths) {
        const webpPath = imagePath.replace(/\.(png|jpe?g)$/i, '.webp');
        if (fs.existsSync(webpPath)) {
            console.log(`Skipping ${imagePath}, WebP version already exists.`);
            continue;
        }

        try {
            await webp.cwebp(imagePath, webpPath, "-q 80");
            console.log(`Successfully converted ${imagePath} to ${webpPath}`);
        } catch (error) {
            console.error(`Failed to convert ${imagePath}:`, error);
        }
    }
    console.log('Image conversion process finished.');
};

findImagesAndConvert(); 