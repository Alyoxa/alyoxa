const sharp = require('sharp');
const path = require('path');
const base = path.resolve(__dirname, '..', 'src', 'assets', 'images', 'ourapproach', 'design');
const files = ['discoverimage.png','refineimage.png','developimage.png','designimage.png'];
(async () => {
  for (const f of files) {
    const src = path.join(base, f);
    const out = src.replace(/\.png$/i, '.webp');
    try {
      const info = await sharp(src).webp({quality:80}).toFile(out);
      console.log(`${f} -> ${path.basename(out)} (${info.size} B)`);
    } catch (e) {
      console.error('Error processing', f, e);
    }
  }
})();

