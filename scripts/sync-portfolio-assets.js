const fs = require('fs');
const path = require('path');

const REPOS_ROOT = path.resolve(__dirname, '..', '..');
const SITE_ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(SITE_ROOT, 'docs', 'portfolio', 'projects_catalog.json');
const PUBLIC_PORTFOLIO_DIR = path.join(SITE_ROOT, 'public', 'portfolio');
const MANIFEST_PATH = path.join(PUBLIC_PORTFOLIO_DIR, 'assets-manifest.json');

const ICON_PATTERNS = [
  /ic_launcher/i,
  /favicon/i,
  /logo192/i,
  /logo512/i,
  /vite\.svg$/i,
  /next\.svg$/i,
  /vercel\.svg$/i,
  /icomoon\.svg$/i,
  /\.idx[\\/]icon\.png$/i,
  /icon-\d+\.png$/i,
];

function isTinyIconPath(relPath) {
  return ICON_PATTERNS.some((regex) => regex.test(relPath));
}

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateCoverSvg(project) {
  const title = escapeXml(project.title || project.name);
  const category = escapeXml(project.category || 'Software Engineering');
  const score = project.score?.total || 40;
  const isLive = project.liveDeployment?.status === 'LIVE';
  const statusText = isLive
    ? `HTTP 200 • LIVE (${escapeXml(project.liveDeployment?.platform || 'Web')})`
    : 'ARQUITECTURA & CÓDIGO FUENTE';
  const statusColor = isLive ? '#10b981' : '#ec4899';
  const tags = (project.tags || []).slice(0, 5);

  const tagElements = tags
    .map((tag, idx) => {
      const x = 80 + idx * 205;
      return `
        <g transform="translate(${x}, 460)">
          <rect width="190" height="44" rx="22" fill="#ffffff" fill-opacity="0.14" stroke="#60a5fa" stroke-width="1.5" />
          <text x="95" y="28" font-family="Montserrat, sans-serif" font-size="15" font-weight="600" fill="#ffffff" text-anchor="middle">${escapeXml(tag)}</text>
        </g>
      `;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0052cc" />
      <stop offset="50%" stop-color="#0077ff" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <rect width="52" height="52" rx="10" fill="#ffffff" fill-opacity="0.05" />
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <rect x="50" y="45" width="1100" height="540" rx="24" fill="#0f172a" fill-opacity="0.45" stroke="#60a5fa" stroke-opacity="0.4" stroke-width="2" />
  <rect x="80" y="85" width="280" height="40" rx="20" fill="#db2777" />
  <text x="220" y="111" font-family="Montserrat, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">${category.toUpperCase()}</text>
  <rect x="380" y="85" width="340" height="40" rx="20" fill="#0f172a" fill-opacity="0.7" stroke="${statusColor}" stroke-width="1.5" />
  <circle cx="405" cy="105" r="6" fill="${statusColor}" />
  <text x="560" y="111" font-family="Montserrat, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">${statusText}</text>
  <rect x="970" y="85" width="150" height="40" rx="20" fill="#ffffff" fill-opacity="0.15" />
  <text x="1045" y="111" font-family="Montserrat, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">Score: ${score}/50</text>
  <text x="80" y="235" font-family="Montserrat, sans-serif" font-size="44" font-weight="800" fill="#ffffff">${title.slice(0, 42)}</text>
  <text x="80" y="290" font-family="Montserrat, sans-serif" font-size="24" font-weight="500" fill="#bfdbfe">${title.length > 42 ? title.slice(42, 90) : escapeXml(project.name)}</text>
  <text x="80" y="365" font-family="Montserrat, sans-serif" font-size="19" font-weight="400" fill="#e2e8f0">${escapeXml((project.description || '').slice(0, 95))}</text>
  <text x="80" y="395" font-family="Montserrat, sans-serif" font-size="19" font-weight="400" fill="#e2e8f0">${escapeXml((project.description || '').slice(95, 190))}${project.description && project.description.length > 190 ? '...' : ''}</text>
  ${tagElements}
</svg>`;
}

function main() {
  const catalogRaw = fs.readFileSync(CATALOG_PATH, 'utf8');
  const catalog = JSON.parse(catalogRaw);
  const included = (catalog.projects || [])
    .filter((p) => p.recommendation === 'INCLUDED' && p.visibility === 'public')
    .sort((a, b) => a.rank - b.rank);

  fs.mkdirSync(PUBLIC_PORTFOLIO_DIR, { recursive: true });
  const allowedIds = new Set(included.map((p) => p.id));

  fs.readdirSync(PUBLIC_PORTFOLIO_DIR, { withFileTypes: true }).forEach((entry) => {
    if (entry.isDirectory() && !allowedIds.has(entry.name)) {
      fs.rmSync(path.join(PUBLIC_PORTFOLIO_DIR, entry.name), { recursive: true, force: true });
    }
  });

  const manifest = {};

  included.forEach((project) => {
    const projectDir = path.join(PUBLIC_PORTFOLIO_DIR, project.id);
    fs.mkdirSync(projectDir, { recursive: true });

    const repoDir = path.join(REPOS_ROOT, project.name);
    const rawPaths = project.visualAssets?.assetPaths || [];
    const copiedUrls = [];

    rawPaths.slice(0, 8).forEach((relAssetPath, idx) => {
      const normalizedRel = relAssetPath.replace(/\\/g, '/');
      if (isTinyIconPath(normalizedRel)) {
        return;
      }
      const sourcePath = path.join(repoDir, normalizedRel);
      if (fs.existsSync(sourcePath)) {
        const stat = fs.statSync(sourcePath);
        if (stat.isFile() && stat.size > 3000) {
          const ext = path.extname(sourcePath).toLowerCase() || '.png';
          const safeBase = path
            .basename(sourcePath, ext)
            .replace(/[^a-zA-Z0-9_-]/g, '_')
            .slice(0, 40);
          const targetFileName = `${String(idx + 1).padStart(2, '0')}_${safeBase}${ext}`;
          const targetPath = path.join(projectDir, targetFileName);
          fs.copyFileSync(sourcePath, targetPath);
          copiedUrls.push(`/portfolio/${project.id}/${targetFileName}`);
        }
      }
    });

    const coverSvgPath = path.join(projectDir, 'cover.svg');
    fs.writeFileSync(coverSvgPath, generateCoverSvg(project), 'utf8');
    const coverUrl = `/portfolio/${project.id}/cover.svg`;

    const galleryImages = copiedUrls.length > 0 ? copiedUrls : [coverUrl];
    const primaryImage = galleryImages[0];

    manifest[project.id] = {
      primaryImage,
      galleryImages,
      hasRealScreenshots: copiedUrls.length > 0,
      coverImage: coverUrl,
    };
  });

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Synced portfolio assets for ${included.length} curated projects into ${PUBLIC_PORTFOLIO_DIR}`);
}

main();
