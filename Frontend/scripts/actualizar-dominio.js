/**
 * Script para configurar o actualizar el dominio definitivo de Aura Corporativa.
 * Uso:
 *   node scripts/actualizar-dominio.js https://tudominio.com
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const newDomainArg = process.argv[2];

if (!newDomainArg) {
  console.error('\n❌ ERROR: Debes proporcionar el dominio.');
  console.log('👉 Ejemplo de uso:');
  console.log('   node scripts/actualizar-dominio.js https://auracorporativa.com\n');
  process.exit(1);
}

// Limpiar y formatear dominio
let newDomain = newDomainArg.trim();
if (!newDomain.startsWith('http://') && !newDomain.startsWith('https://')) {
  newDomain = 'https://' + newDomain;
}
newDomain = newDomain.replace(/\/+$/, ''); // Eliminar barra final

console.log(`\n🌐 Configurando nuevo dominio: ${newDomain}\n`);

// 1. Actualizar siteConfig.ts
const siteConfigPath = path.join(rootDir, 'src', 'config', 'siteConfig.ts');
if (fs.existsSync(siteConfigPath)) {
  let content = fs.readFileSync(siteConfigPath, 'utf8');
  content = content.replace(/domain:\s*['"][^'"]+['"]/, `domain: '${newDomain}'`);
  fs.writeFileSync(siteConfigPath, content, 'utf8');
  console.log('✔ src/config/siteConfig.ts actualizado');
}

// 2. Actualizar index.html
const indexHtmlPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let content = fs.readFileSync(indexHtmlPath, 'utf8');
  // Reemplazar ocurrencias de dominios previos en canónicas, OG y schema
  content = content.replace(/https:\/\/auracorporativa\.(pe|com)/g, newDomain);
  fs.writeFileSync(indexHtmlPath, content, 'utf8');
  console.log('✔ index.html actualizado (canónicas, OG, Schema.org)');
}

// 3. Actualizar public/robots.txt
const robotsPath = path.join(rootDir, 'public', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  let content = fs.readFileSync(robotsPath, 'utf8');
  content = content.replace(/Sitemap:\s*https?:\/\/[^\s]+/g, `Sitemap: ${newDomain}/sitemap.xml`);
  fs.writeFileSync(robotsPath, content, 'utf8');
  console.log('✔ public/robots.txt actualizado');
}

// 4. Actualizar public/sitemap.xml
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let content = fs.readFileSync(sitemapPath, 'utf8');
  content = content.replace(/https:\/\/auracorporativa\.(pe|com)/g, newDomain);
  fs.writeFileSync(sitemapPath, content, 'utf8');
  console.log('✔ public/sitemap.xml actualizado');
}

console.log(`\n🎉 Dominio configurado exitosamente a: ${newDomain}`);
console.log('👉 Siguiente paso: ejecuta `npm run build` para compilar la versión final de producción.\n');
