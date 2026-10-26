const sharp = require('sharp');
const path = require('path');
const baseDir = path.resolve(__dirname, '..');

const images = [
  'src/assets/images/projects/headedthere/headedthere-desktop.png',
  'src/assets/images/projects/headedthere/headedthere-mobile.png',
  'src/assets/images/projects/logowebagency/logowebagency-desktop.png',
  'src/assets/images/projects/logowebagency/logowebagency-mobile.png',
  'src/assets/images/projects/maddy/maddy-desktop.png',
  'src/assets/images/projects/maddy/maddy-mobile.png',
  'src/assets/images/projects/mformaddy/mformaddy-desktop.png',
  'src/assets/images/projects/mformaddy/mformaddy-mobile.png',
];

(async () => {
  for (const rel of images) {
    const input = path.join(baseDir, rel);
    const output = input.replace(/\.png$/i, '.webp');
    try {
      await sharp(input)
        .webp({ quality: 80 })
        .toFile(output);
      console.log(`Converted ${rel} -> ${path.basename(output)}`);
    } catch (e) {
      console.error(`Error converting ${rel}:`, e.message);
    }
  }
})();
