// scripts/download-assets.js
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Asset List to download
const assets = [
  // Common
  {
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/common/placeholder.jpg'
  },
  // Home
  {
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80',
    dest: 'public/assets/imgs/home/hero-main.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/home/about-snippet.jpg'
  },
  // About
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80',
    dest: 'public/assets/imgs/about/hero-poster.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/imgs/about/showroom-saskatoon.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/about/team-jaspreet.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/about/team-sumanpreet.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/about/team-michael.jpg'
  },
  // Products
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/products/roller-blinds.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/products/zebra-blinds.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/products/honeycomb-blinds.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/products/vertical-blinds.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/products/wooden-blinds.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/products/pvc-blinds.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/products/hardwood-flooring.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/products/laminate-flooring.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/products/vinyl-plank.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/imgs/products/engineered-hardwood.jpg'
  },
  // Room Viewer
  {
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80',
    dest: 'public/assets/imgs/room-viewer/preset-modern.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
    dest: 'public/assets/imgs/room-viewer/preset-classic.jpg'
  },
  // Videos
  {
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    dest: 'public/assets/videos/about/hero-ambient.mp4'
  },
  {
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    dest: 'public/assets/videos/home/hero-background.mp4'
  }
];

// Helper to download a single file handling redirects
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(rootDir, destPath);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(fullPath);
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    };

    const client = url.startsWith('https') ? https : http;

    const request = client.get(options, (response) => {
      // Handle HTTP redirects (301, 302, 307, 308)
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        fs.unlinkSync(fullPath);
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(fullPath);
        return reject(new Error(`Failed to download ${url}: HTTP ${response.statusCode}`));
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`[DOWNLOADED] ${destPath}`);
        resolve();
      });
    });

    request.on('error', (err) => {
      fs.unlink(fullPath, () => {});
      console.error(`[ERROR] ${url}: ${err.message}`);
      reject(err);
    });
  });
}

async function run() {
  console.log('🚀 Starting asset download and localization script...\n');
  let successCount = 0;

  for (const asset of assets) {
    try {
      await downloadFile(asset.url, asset.dest);
      successCount++;
    } catch (err) {
      console.warn(`⚠️ Skipped/Failed ${asset.dest}: ${err.message}`);
    }
  }

  console.log(`\n✅ Completed! Successfully localized ${successCount}/${assets.length} assets into public/assets/`);
}

run();
