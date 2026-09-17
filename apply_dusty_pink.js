const fs = require('fs');

// 1. UPDATE index.html
let html = fs.readFileSync('public/index.html', 'utf8');

// Update Tailwind config to include dusty color palette
html = html.replace(/colors:\s*\{[\s\S]*?gov:\s*\{[\s\S]*?\}\s*\}\s*\}/, `colors: {
            dusty: {
              50: '#fdf7f9',
              100: '#fceef3',
              200: '#f9dee7',
              300: '#f3bfd0',
              400: '#e895b0',
              500: '#d96e90',
              600: '#c45075',
              700: '#a93d5f',
              800: '#8c3450',
              900: '#65253a',
              950: '#421323'
            },
            rose: {
              50: '#fff1f2',
              100: '#ffe4e6',
              200: '#fecdd3',
              500: '#f43f5e',
              600: '#e11d48'
            }
          }`);

// Update header classes
html = html.replace(/class="bg-gov-900 text-white shadow-lg sticky top-0 z-30 border-b border-gov-800"/g,
  'class="bg-gradient-to-r from-dusty-950 via-dusty-900 to-dusty-800 text-white shadow-md sticky top-0 z-30 border-b border-dusty-700/60"');

html = html.replace(/from-brand-600 to-emerald-400/g, 'from-dusty-500 to-rose-400');
html = html.replace(/bg-emerald-500\/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500\/30/g,
  'bg-dusty-500/20 text-dusty-200 font-semibold px-2.5 py-0.5 rounded-full border border-dusty-400/30');

html = html.replace(/class="bg-gov-800\/80 backdrop-blur border-t border-gov-700\/60"/g,
  'class="bg-dusty-950/80 backdrop-blur border-t border-dusty-800/60"');

// Update active tab default button class in index.html
html = html.replace(/text-white bg-gov-900 border border-gov-700/g,
  'text-white bg-dusty-800 border border-dusty-600');
html = html.replace(/text-slate-300 hover:text-white hover:bg-gov-700\/50/g,
  'text-dusty-200 hover:text-white hover:bg-dusty-900/60');

// Update buttons that were emerald to dusty-600
html = html.replace(/bg-emerald-600 hover:bg-emerald-700/g, 'bg-dusty-600 hover:bg-dusty-700 shadow-sm');
html = html.replace(/text-emerald-400/g, 'text-dusty-300');
html = html.replace(/text-emerald-600/g, 'text-dusty-600');
html = html.replace(/text-emerald-700/g, 'text-dusty-700');
html = html.replace(/text-emerald-800/g, 'text-dusty-800');

// Focus rings
html = html.replace(/focus:ring-emerald-500\/20 focus:border-emerald-500/g, 'focus:ring-dusty-500/25 focus:border-dusty-500');
html = html.replace(/focus:ring-emerald-500\/20/g, 'focus:ring-dusty-500/25');

// Update Cards to use dusty-card
html = html.replace(/bg-white rounded-2xl p-5 border border-slate-200\/80 shadow-sm/g,
  'dusty-card rounded-2xl p-5');
html = html.replace(/bg-white rounded-2xl p-6 border border-slate-200\/80 shadow-sm/g,
  'dusty-card rounded-2xl p-6');
html = html.replace(/bg-white rounded-2xl border border-slate-200\/80 shadow-sm/g,
  'dusty-card rounded-2xl');

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('index.html updated to Pink Dusty theme');

// 2. UPDATE app.js
let appJs = fs.readFileSync('public/js/app.js', 'utf8');

// Update switchTab classes
appJs = appJs.replace(
  /btn\.className = 'nav-tab active flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-gov-900 border border-gov-700 shadow-sm transition';/g,
  "btn.className = 'nav-tab active flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-dusty-800 border border-dusty-600 shadow-sm transition';"
);
appJs = appJs.replace(
  /btn\.className = 'nav-tab flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-gov-700\/50 transition';/g,
  "btn.className = 'nav-tab flex items-center gap-2 px-3 py-2 rounded-lg text-dusty-200 hover:text-white hover:bg-dusty-900/60 transition';"
);

// Update status badge colors
appJs = appJs.replace(
  /badgeEl\.className = 'flex items-center gap-1\.5 px-3 py-1\.5 rounded-lg text-xs font-semibold bg-emerald-900\/40 text-emerald-300 border border-emerald-700\/50';/g,
  "badgeEl.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-dusty-900/60 text-dusty-200 border border-dusty-600/60';"
);

// Update template tab active class
appJs = appJs.replace(
  /btn\.className = 'tpl-tab px-4 py-2 rounded-xl text-xs font-semibold bg-gov-900 text-white shadow-sm transition flex items-center gap-2';/g,
  "btn.className = 'tpl-tab px-4 py-2 rounded-xl text-xs font-semibold bg-dusty-800 text-white border border-dusty-600 shadow-sm transition flex items-center gap-2';"
);
appJs = appJs.replace(
  /btn\.className = 'tpl-tab px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition flex items-center gap-2';/g,
  "btn.className = 'tpl-tab px-4 py-2 rounded-xl text-xs font-semibold bg-white text-dusty-700 border border-dusty-200 hover:bg-dusty-50 transition flex items-center gap-2';"
);

// Toast notification color
appJs = appJs.replace(/success:\s*'bg-emerald-700 text-white border-emerald-800'/g,
  "success: 'bg-dusty-700 text-white border-dusty-800 shadow-lg'");

fs.writeFileSync('public/js/app.js', appJs, 'utf8');
console.log('app.js updated with Pink Dusty theme logic');
