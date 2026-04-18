/* ========================================================================
   ICON SYSTEM — Custom SVG icons (Lucide-style, 24x24, stroke-based)
   Usage: icon('home') returns SVG string. icon('home', 20) sizes it.
   ======================================================================== */

const ICONS = {
  // Navigation
  home: '<path d="M3 12 L12 3 L21 12"/><path d="M5 10 V20 H19 V10"/><path d="M10 20 V14 H14 V20"/>',
  dashboard: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
  products: '<path d="M21 8 L12 3 L3 8 L12 13 L21 8 Z"/><path d="M3 8 V16 L12 21 L21 16 V8"/><path d="M12 13 V21"/>',
  inventory: '<rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/><line x1="7" y1="7" x2="7.01" y2="7"/><line x1="7" y1="17" x2="7.01" y2="17"/>',
  supply: '<rect x="1" y="6" width="15" height="10" rx="1"/><path d="M16 10 H20 L23 13 V16 H16"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  orders: '<path d="M9 2 H15 A2 2 0 0 1 17 4 V6 H20 V21 H4 V6 H7 V4 A2 2 0 0 1 9 2 Z"/><path d="M9 11 L11 13 L15 9"/>',
  costs: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/>',
  pricing: '<path d="M20.59 13.41 L13.42 20.58 A2 2 0 0 1 10.59 20.58 L2 12 V2 H12 L20.59 10.59 A2 2 0 0 1 20.59 13.41 Z"/><circle cx="7" cy="7" r="1.5"/>',
  profitability: '<path d="M12 1 V23"/><path d="M17 5 H9.5 A3.5 3.5 0 0 0 9.5 12 H14.5 A3.5 3.5 0 0 1 14.5 19 H6"/>',
  cashflow: '<path d="M3 17 L9 11 L13 15 L21 7"/><path d="M14 7 H21 V14"/>',
  forecast: '<path d="M3 3 V21 H21"/><path d="M7 14 L11 10 L15 13 L19 6"/><circle cx="7" cy="14" r="1.5"/><circle cx="11" cy="10" r="1.5"/><circle cx="15" cy="13" r="1.5"/><circle cx="19" cy="6" r="1.5"/>',
  scenarios: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
  reports: '<rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15 A1.65 1.65 0 0 0 19.73 16.82 L19.79 16.88 A2 2 0 1 1 16.96 19.71 L16.9 19.65 A1.65 1.65 0 0 0 15.08 19.32 A1.65 1.65 0 0 0 14 20.85 V21 A2 2 0 1 1 10 21 V20.91 A1.65 1.65 0 0 0 8.91 19.4 A1.65 1.65 0 0 0 7.09 19.73 L7.03 19.79 A2 2 0 1 1 4.2 16.96 L4.26 16.9 A1.65 1.65 0 0 0 4.59 15.08 A1.65 1.65 0 0 0 3.07 14 H3 A2 2 0 1 1 3 10 H3.09 A1.65 1.65 0 0 0 4.6 8.91 A1.65 1.65 0 0 0 4.27 7.09 L4.21 7.03 A2 2 0 1 1 7.04 4.2 L7.1 4.26 A1.65 1.65 0 0 0 8.92 4.59 H9 A1.65 1.65 0 0 0 10 3.07 V3 A2 2 0 1 1 14 3 V3.09 A1.65 1.65 0 0 0 15 4.6 A1.65 1.65 0 0 0 16.82 4.27 L16.88 4.21 A2 2 0 1 1 19.71 7.04 L19.65 7.1 A1.65 1.65 0 0 0 19.32 8.92 V9 A1.65 1.65 0 0 0 20.85 10 H21 A2 2 0 1 1 21 14 H20.91 A1.65 1.65 0 0 0 19.4 15 Z"/>',

  // Actions
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
  edit: '<path d="M11 4 H4 A2 2 0 0 0 2 6 V20 A2 2 0 0 0 4 22 H18 A2 2 0 0 0 20 20 V13"/><path d="M18.5 2.5 A2.12 2.12 0 0 1 21.5 5.5 L12 15 L8 16 L9 12 L18.5 2.5 Z"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6 V20 A2 2 0 0 1 17 22 H7 A2 2 0 0 1 5 20 V6 M8 6 V4 A2 2 0 0 1 10 2 H14 A2 2 0 0 1 16 4 V6"/>',
  search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  download: '<path d="M21 15 V19 A2 2 0 0 1 19 21 H5 A2 2 0 0 1 3 19 V15"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  upload: '<path d="M21 15 V19 A2 2 0 0 1 19 21 H5 A2 2 0 0 1 3 19 V15"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15 H4 A2 2 0 0 1 2 13 V4 A2 2 0 0 1 4 2 H13 A2 2 0 0 1 15 4 V5"/>',
  filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9 A9 9 0 0 1 18.36 5.64 L23 10 M1 14 L5.64 18.36 A9 9 0 0 0 20.49 15"/>',
  menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',

  // Indicators
  arrowUp: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
  arrowDown: '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
  trendingUp: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  trendingDown: '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>',
  alert: '<path d="M10.29 3.86 L1.82 18 A2 2 0 0 0 3.54 21 H20.46 A2 2 0 0 0 22.18 18 L13.71 3.86 A2 2 0 0 0 10.29 3.86 Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  tag: '<path d="M20.59 13.41 L13.42 20.58 A2 2 0 0 1 10.59 20.58 L2 12 V2 H12 L20.59 10.59 A2 2 0 0 1 20.59 13.41 Z"/><circle cx="7" cy="7" r="1.5"/>',
  box: '<path d="M21 16 V8 A2 2 0 0 0 20 6.27 L13 2.27 A2 2 0 0 0 11 2.27 L4 6.27 A2 2 0 0 0 3 8 V16 A2 2 0 0 0 4 17.73 L11 21.73 A2 2 0 0 0 13 21.73 L20 17.73 A2 2 0 0 0 21 16 Z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  barChart: '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
  pieChart: '<path d="M21.21 15.89 A10 10 0 1 1 8 2.83"/><path d="M22 12 A10 10 0 0 0 12 2 V12 Z"/>',
  dollar: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5 H9.5 A3.5 3.5 0 0 0 9.5 12 H14.5 A3.5 3.5 0 0 1 14.5 19 H6"/>',
  package: '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16 V8 A2 2 0 0 0 20 6.27 L13 2.27 A2 2 0 0 0 11 2.27 L4 6.27 A2 2 0 0 0 3 8 V16 A2 2 0 0 0 4 17.73 L11 21.73 A2 2 0 0 0 13 21.73 L20 17.73 A2 2 0 0 0 21 16 Z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  truck: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  users: '<path d="M17 21 V19 A4 4 0 0 0 13 15 H5 A4 4 0 0 0 1 19 V21"/><circle cx="9" cy="7" r="4"/><path d="M23 21 V19 A4 4 0 0 0 20 15.13"/><path d="M16 3.13 A4 4 0 0 1 16 11.02"/>',
  phone: '<path d="M22 16.92 V19.92 A2 2 0 0 1 19.83 21.92 A19.79 19.79 0 0 1 11.19 18.85 A19.5 19.5 0 0 1 5.12 12.81 A19.79 19.79 0 0 1 2.05 4.18 A2 2 0 0 1 4.05 2 H7.05 A2 2 0 0 1 9.05 3.72 A12.84 12.84 0 0 0 9.75 6.55 A2 2 0 0 1 9.3 8.66 L8.03 9.93 A16 16 0 0 0 14.07 15.97 L15.34 14.7 A2 2 0 0 1 17.45 14.25 A12.84 12.84 0 0 0 20.28 14.95 A2 2 0 0 1 22 16.92 Z"/>',
  mail: '<path d="M4 4 H20 A2 2 0 0 1 22 6 V18 A2 2 0 0 1 20 20 H4 A2 2 0 0 1 2 18 V6 A2 2 0 0 1 4 4 Z"/><polyline points="22 6 12 13 2 6"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  shoppingBag: '<path d="M6 2 L3 6 V20 A2 2 0 0 0 5 22 H19 A2 2 0 0 0 21 20 V6 L18 2 Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10 A4 4 0 0 1 8 10"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  calculator: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8.01" y2="10"/><line x1="12" y1="10" x2="12.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/><line x1="8" y1="14" x2="8.01" y2="14"/><line x1="12" y1="14" x2="12.01" y2="14"/><line x1="16" y1="14" x2="16.01" y2="14"/><line x1="8" y1="18" x2="8.01" y2="18"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="18" x2="16.01" y2="18"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21 V5 A2 2 0 0 0 14 3 H10 A2 2 0 0 0 8 5 V21"/>',
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  moreVert: '<circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>',
  heart: '<path d="M20.84 4.61 A5.5 5.5 0 0 0 16.95 3 A5.5 5.5 0 0 0 12 5.09 A5.5 5.5 0 0 0 7.05 3 A5.5 5.5 0 0 0 3.16 4.61 A5.5 5.5 0 0 0 3.16 12.39 L12 21.23 L20.84 12.39 A5.5 5.5 0 0 0 20.84 4.61 Z"/>',
  sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  moon: '<path d="M21 12.79 A9 9 0 1 1 11.21 3 A7 7 0 0 0 21 12.79 Z"/>',
  sparkles: '<path d="M12 3 L14 9 L20 11 L14 13 L12 19 L10 13 L4 11 L10 9 Z"/><path d="M19 3 L19.5 4.5 L21 5 L19.5 5.5 L19 7 L18.5 5.5 L17 5 L18.5 4.5 Z"/><path d="M5 15 L5.5 16.5 L7 17 L5.5 17.5 L5 19 L4.5 17.5 L3 17 L4.5 16.5 Z"/>',
};

function icon(name, size = 18, extra = '') {
  const svg = ICONS[name] || '';
  return `<svg class="icon-svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${svg}</svg>`;
}

window.icon = icon;
window.ICONS = ICONS;
