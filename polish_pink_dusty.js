const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Variable pills in Tab 3
html = html.replace(/bg-emerald-50 text-emerald-700 border border-emerald-200/g, 'bg-dusty-100 text-dusty-800 border border-dusty-200 hover:bg-dusty-200');

// Morning card in quick actions
html = html.replace(/bg-emerald-50\/50 rounded-xl p-4 border border-emerald-200\/70/g, 'bg-gradient-to-b from-dusty-50 to-white rounded-xl p-4 border border-dusty-200');
html = html.replace(/bg-emerald-600 text-white flex items-center justify-center text-sm shadow-sm/g, 'bg-dusty-600 text-white flex items-center justify-center text-sm shadow-sm');
html = html.replace(/bg-white text-emerald-800 px-2 py-0\.5 rounded border border-emerald-200/g, 'bg-white text-dusty-800 px-2 py-0.5 rounded border border-dusty-200');

// Office rules box
html = html.replace(/text-emerald-700">07\.30 &ndash; 16\.00 WIB/g, 'text-dusty-700 font-bold">07.30 &ndash; 16.00 WIB');
html = html.replace(/<span class="w-2 h-2 rounded-full bg-emerald-500"><\/span>\s*Background Cron Scheduler Aktif/g,
  '<span class="w-2 h-2 rounded-full bg-dusty-500 animate-pulse"></span>Background Cron Scheduler Aktif');

// WA chat mockup header
html = html.replace(/bg-\[#075e54\] text-white px-4 py-3 flex items-center gap-3/g, 'bg-gradient-to-r from-dusty-900 to-dusty-800 text-white px-4 py-3 flex items-center gap-3');
html = html.replace(/bg-emerald-400\/30 flex items-center justify-center text-white border border-white\/20/g, 'bg-white/20 flex items-center justify-center text-white border border-white/20');
html = html.replace(/text-emerald-200/g, 'text-dusty-200');

// Badges
html = html.replace(/bg-emerald-100 text-emerald-800/g, 'bg-dusty-100 text-dusty-800');
html = html.replace(/bg-emerald-50 text-blue-600/g, 'bg-dusty-50 text-dusty-600');
html = html.replace(/bg-emerald-50 text-dusty-600/g, 'bg-dusty-50 text-dusty-600');

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Polished index.html pink dusty theme');

// Update app.js birthday banner & badges
let appJs = fs.readFileSync('public/js/app.js', 'utf8');

appJs = appJs.replace(
  /bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white/g,
  'bg-gradient-to-r from-dusty-800 via-dusty-700 to-rose-500 text-white border border-dusty-600 shadow-md'
);
appJs = appJs.replace(
  /bg-white text-pink-700 hover:bg-pink-50 rounded-xl text-xs font-bold/g,
  'bg-white text-dusty-800 hover:bg-dusty-50 rounded-xl text-xs font-bold'
);
appJs = appJs.replace(
  /bg-emerald-100 text-emerald-800/g,
  'bg-dusty-100 text-dusty-800 font-semibold'
);
appJs = appJs.replace(
  /text-emerald-600 hover:text-emerald-700/g,
  'text-dusty-600 hover:text-dusty-800'
);
appJs = appJs.replace(
  /hover:bg-emerald-50/g,
  'hover:bg-dusty-50'
);

fs.writeFileSync('public/js/app.js', appJs, 'utf8');
console.log('Polished app.js pink dusty theme');
