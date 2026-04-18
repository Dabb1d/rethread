/* ========================================================================
   PROFITLY — Universal Business Operating System
   ======================================================================== */

// ===== STATE =====
const STORAGE_KEY = 'profitly_data_v1';
const state = {
  settings: { name: 'My Business', industry: 'Retail / Thrift', currency: 'USD', fy: 'January', theme: 'light', accent: '#0984e3' },
  products: [],
  suppliers: [],
  purchaseOrders: [],
  orders: [],
  expenses: [],
  fixedCosts: [],
};

const CHARTS = {};

// ===== DEMO DATA =====
function loadDemoData() {
  state.products = [
    { id: 'P001', sku: 'VTG-DENIM-M', name: 'Vintage Denim Jacket (M)', category: 'Outerwear', supplier: 'Goodwill Bulk', cost: 3.50, price: 28.00, stock: 14, reorder: 5, sold: 48 },
    { id: 'P002', sku: 'TEE-GRAPH-001', name: 'Graphic Band Tee', category: 'Tops', supplier: 'Estate Sale Co', cost: 1.25, price: 12.00, stock: 32, reorder: 10, sold: 96 },
    { id: 'P003', sku: 'SHOE-CONV-9', name: 'Converse Sz 9', category: 'Footwear', supplier: 'Direct Donation', cost: 0.00, price: 18.00, stock: 6, reorder: 4, sold: 24 },
    { id: 'P004', sku: 'JEAN-LEVI-32', name: 'Levi\'s 501 (32x32)', category: 'Bottoms', supplier: 'Goodwill Bulk', cost: 2.75, price: 22.00, stock: 18, reorder: 8, sold: 60 },
    { id: 'P005', sku: 'DRESS-SUMMER', name: 'Summer Dress (S)', category: 'Dresses', supplier: 'Estate Sale Co', cost: 2.00, price: 24.00, stock: 9, reorder: 5, sold: 32 },
    { id: 'P006', sku: 'FLANNEL-PLAID', name: 'Flannel Shirt', category: 'Tops', supplier: 'Goodwill Bulk', cost: 2.00, price: 16.00, stock: 22, reorder: 8, sold: 58 },
    { id: 'P007', sku: 'BAG-LEATHER', name: 'Leather Shoulder Bag', category: 'Accessories', supplier: 'Estate Sale Co', cost: 4.00, price: 35.00, stock: 7, reorder: 3, sold: 19 },
    { id: 'P008', sku: 'CAP-SPORTS', name: 'Vintage Sports Cap', category: 'Accessories', supplier: 'Direct Donation', cost: 0.50, price: 10.00, stock: 3, reorder: 6, sold: 41 },
    { id: 'P009', sku: 'SWEATER-WOOL', name: 'Wool Sweater', category: 'Tops', supplier: 'Bulk Thrift Inc', cost: 2.50, price: 20.00, stock: 15, reorder: 6, sold: 33 },
    { id: 'P010', sku: 'BOOTS-DOC', name: 'Doc Martens Sz 8', category: 'Footwear', supplier: 'Estate Sale Co', cost: 8.00, price: 55.00, stock: 4, reorder: 2, sold: 12 },
  ];

  state.suppliers = [
    { id: 'S01', name: 'Goodwill Bulk', category: 'Wholesale Thrift', leadDays: 7, moq: 100, reliability: 92 },
    { id: 'S02', name: 'Estate Sale Co', category: 'Estate Liquidation', leadDays: 14, moq: 50, reliability: 85 },
    { id: 'S03', name: 'Direct Donation', category: 'Community', leadDays: 0, moq: 1, reliability: 100 },
    { id: 'S04', name: 'Bulk Thrift Inc', category: 'Wholesale Thrift', leadDays: 10, moq: 200, reliability: 88 },
  ];

  state.purchaseOrders = [
    { id: 'PO-001', supplier: 'Goodwill Bulk', amount: 450, eta: '2026-04-25', status: 'In Transit' },
    { id: 'PO-002', supplier: 'Estate Sale Co', amount: 320, eta: '2026-05-02', status: 'Confirmed' },
    { id: 'PO-003', supplier: 'Bulk Thrift Inc', amount: 780, eta: '2026-05-10', status: 'Pending' },
  ];

  state.orders = generateMockOrders(45);

  state.fixedCosts = [
    { id: 'F01', name: 'Rent', amount: 2820, category: 'Facilities' },
    { id: 'F02', name: 'Insurance', amount: 125, category: 'Insurance' },
    { id: 'F03', name: 'Utilities', amount: 150, category: 'Facilities' },
    { id: 'F04', name: 'Marketing', amount: 300, category: 'Marketing' },
    { id: 'F05', name: 'Supplies', amount: 100, category: 'Operations' },
    { id: 'F06', name: 'POS / Software', amount: 100, category: 'Technology' },
    { id: 'F07', name: 'Security', amount: 50, category: 'Operations' },
    { id: 'F08', name: 'Miscellaneous', amount: 100, category: 'Operations' },
  ];

  state.expenses = [
    { id: 'E01', date: '2026-04-14', category: 'Inventory', description: 'Goodwill bulk haul (200 items)', type: 'Variable', amount: 450 },
    { id: 'E02', date: '2026-04-10', category: 'Marketing', description: 'Instagram ads', type: 'Fixed', amount: 150 },
    { id: 'E03', date: '2026-04-08', category: 'Facilities', description: 'April rent', type: 'Fixed', amount: 2820 },
    { id: 'E04', date: '2026-04-05', category: 'Operations', description: 'Hangers, tags, bags', type: 'Variable', amount: 82 },
    { id: 'E05', date: '2026-04-01', category: 'Technology', description: 'Square subscription', type: 'Fixed', amount: 100 },
    { id: 'E06', date: '2026-03-28', category: 'Inventory', description: 'Estate sale lot', type: 'Variable', amount: 320 },
  ];

  persist();
}

function generateMockOrders(n) {
  const channels = ['In-Store', 'Online', 'Pop-up', 'Wholesale'];
  const out = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    const items = 1 + Math.floor(Math.random() * 3);
    const total = +(items * (10 + Math.random() * 40)).toFixed(2);
    out.push({
      id: 'ORD-' + String(1000 + n - i),
      date: d.toISOString().slice(0, 10),
      customer: 'Walk-in #' + (i + 1),
      channel: channels[Math.floor(Math.random() * channels.length)],
      items, total,
      status: ['Completed', 'Completed', 'Completed', 'Refunded'][Math.floor(Math.random() * 4)]
    });
  }
  return out;
}

// ===== PERSISTENCE =====
function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch (e) { console.warn('Persist failed', e); }
}
function hydrate() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) { loadDemoData(); return; }
    const data = JSON.parse(raw);
    Object.assign(state, data);
  } catch (e) { loadDemoData(); }
}

// ===== UTILITIES =====
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const fmt = (n, d = 0) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const money = (n, d = 0) => '$' + fmt(n, d);
const pct = (n, d = 1) => fmt(n, d) + '%';

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { t.hidden = true; }, 2400);
}

function uid(prefix) { return prefix + Math.random().toString(36).slice(2, 8).toUpperCase(); }

// ===== NAVIGATION =====
function switchTab(name) {
  $$('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  $$('.tab-content').forEach(c => c.classList.toggle('active', c.id === 'tab-' + name));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  $('#sidebar').classList.remove('open');
  renderTab(name);
}

function renderTab(name) {
  const renderers = {
    home: () => {},
    dashboard: renderDashboard,
    products: renderProducts,
    inventory: renderInventory,
    supply: renderSupply,
    orders: renderOrders,
    costs: renderCosts,
    pricing: renderPricing,
    profitability: renderProfitability,
    cashflow: renderCashflow,
    forecast: renderForecast,
    scenarios: renderScenarios,
    reports: () => {},
    settings: renderSettings,
  };
  (renderers[name] || (() => {}))();
}

// ===== DASHBOARD =====
function computeTotals() {
  const revenue = state.orders.reduce((s, o) => s + (o.status !== 'Refunded' ? o.total : 0), 0);
  const cogs = state.products.reduce((s, p) => s + p.cost * p.sold, 0);
  const grossProfit = revenue - cogs;
  const margin = revenue ? (grossProfit / revenue) * 100 : 0;
  const fixedMonthly = state.fixedCosts.reduce((s, f) => s + f.amount, 0);
  const variableExpenses = state.expenses.filter(e => e.type === 'Variable').reduce((s, e) => s + e.amount, 0);
  const stockValue = state.products.reduce((s, p) => s + p.cost * p.stock, 0);
  const stockRetail = state.products.reduce((s, p) => s + p.price * p.stock, 0);
  const orders = state.orders.length;
  const aov = orders ? revenue / orders : 0;
  return { revenue, cogs, grossProfit, margin, fixedMonthly, variableExpenses, stockValue, stockRetail, orders, aov };
}

function renderDashboard() {
  const t = computeTotals();
  const netProfit = t.grossProfit - t.fixedMonthly - t.variableExpenses;
  $('#kpiDashboard').innerHTML = kpiBlock([
    { label: 'Revenue', val: money(t.revenue), change: '+12.4%', pos: true },
    { label: 'Gross Profit', val: money(t.grossProfit), change: '+8.2%', pos: true },
    { label: 'Gross Margin', val: pct(t.margin), change: '+2.1%', pos: true },
    { label: 'Net Profit', val: money(netProfit), change: netProfit >= 0 ? '+4.5%' : '-2.1%', pos: netProfit >= 0 },
    { label: 'Orders', val: fmt(t.orders), change: '+15', pos: true },
    { label: 'AOV', val: money(t.aov, 2), change: '+$1.20', pos: true },
    { label: 'Inventory Value', val: money(t.stockValue), change: '', pos: true },
    { label: 'Retail Value', val: money(t.stockRetail), change: '', pos: true },
  ]);

  // Revenue vs Expenses
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  const rev = months.map((_, i) => 2400 + i * 380 + Math.random() * 400);
  const exp = months.map((_, i) => 1800 + i * 220 + Math.random() * 300);
  drawChart('chart_revExp', 'bar', {
    labels: months,
    datasets: [
      { label: 'Revenue', data: rev, backgroundColor: 'rgba(9,132,227,0.7)' },
      { label: 'Expenses', data: exp, backgroundColor: 'rgba(225,112,85,0.7)' },
    ]
  });

  // Margin trend
  drawChart('chart_margin', 'line', {
    labels: months,
    datasets: [{
      label: 'Gross Margin %',
      data: months.map((_, i) => 52 + i * 2 + Math.random() * 3),
      borderColor: '#00b894', backgroundColor: 'rgba(0,184,148,0.1)',
      fill: true, tension: 0.35
    }]
  });

  // Top products
  const top = [...state.products].sort((a, b) => (b.sold * b.price) - (a.sold * a.price)).slice(0, 5);
  $('#topProducts').innerHTML = top.map(p => `
    <div class="top-product">
      <div class="top-product-info"><strong>${escape(p.name)}</strong><span>${p.sold} sold · ${escape(p.category)}</span></div>
      <div class="top-product-num">${money(p.sold * p.price)}</div>
    </div>`).join('');

  // Cost mix
  const costMap = {};
  state.fixedCosts.forEach(f => { costMap[f.category] = (costMap[f.category] || 0) + f.amount; });
  drawChart('chart_costMix', 'doughnut', {
    labels: Object.keys(costMap),
    datasets: [{ data: Object.values(costMap), backgroundColor: ['#0984e3', '#00b894', '#6c5ce7', '#e17055', '#fdcb6e', '#95a5a6'] }]
  });

  // Inventory health
  const total = state.products.length;
  const low = state.products.filter(p => p.stock <= p.reorder).length;
  const out = state.products.filter(p => p.stock === 0).length;
  $('#invHealth').innerHTML = `
    <div class="health-bar">
      <div class="health-bar-label"><span>Healthy Stock</span><span>${total - low}/${total}</span></div>
      <div class="health-bar-track"><div class="health-bar-fill" style="width:${total ? ((total - low) / total * 100) : 0}%"></div></div>
    </div>
    <div class="health-bar">
      <div class="health-bar-label"><span>Low Stock</span><span>${low}</span></div>
      <div class="health-bar-track"><div class="health-bar-fill warn" style="width:${total ? (low / total * 100) : 0}%"></div></div>
    </div>
    <div class="health-bar">
      <div class="health-bar-label"><span>Out of Stock</span><span>${out}</span></div>
      <div class="health-bar-track"><div class="health-bar-fill bad" style="width:${total ? (out / total * 100) : 0}%"></div></div>
    </div>
    <p class="note" style="margin-top:10px">Total SKUs: ${total} · Inventory Value: ${money(state.products.reduce((s, p) => s + p.cost * p.stock, 0))}</p>
  `;
}

function kpiBlock(items) {
  return items.map(k => `
    <div class="kpi">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-val ${k.pos === false ? 'neg' : ''}">${k.val}</div>
      ${k.change ? `<div class="kpi-change ${k.pos ? 'up' : 'down'}">${k.pos ? '▲' : '▼'} ${k.change}</div>` : ''}
    </div>`).join('');
}

// ===== PRODUCTS =====
function renderProducts() {
  const totalValue = state.products.reduce((s, p) => s + p.cost * p.stock, 0);
  const totalRetail = state.products.reduce((s, p) => s + p.price * p.stock, 0);
  const avgMargin = state.products.length ? state.products.reduce((s, p) => s + ((p.price - p.cost) / p.price * 100), 0) / state.products.length : 0;
  $('#kpiProducts').innerHTML = kpiBlock([
    { label: 'Total SKUs', val: fmt(state.products.length) },
    { label: 'Inventory @ Cost', val: money(totalValue) },
    { label: 'Inventory @ Retail', val: money(totalRetail) },
    { label: 'Avg Margin', val: pct(avgMargin) },
    { label: 'Total Units', val: fmt(state.products.reduce((s, p) => s + p.stock, 0)) },
    { label: 'Units Sold', val: fmt(state.products.reduce((s, p) => s + p.sold, 0)) },
  ]);

  const q = ($('#productSearch').value || '').toLowerCase();
  const rows = state.products.filter(p =>
    !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  ).map(p => {
    const margin = p.price ? ((p.price - p.cost) / p.price * 100) : 0;
    return `<tr>
      <td><code>${escape(p.sku)}</code></td>
      <td>${escape(p.name)}</td>
      <td>${escape(p.category)}</td>
      <td>${escape(p.supplier)}</td>
      <td class="num">${money(p.cost, 2)}</td>
      <td class="num">${money(p.price, 2)}</td>
      <td class="num">${pct(margin)}</td>
      <td class="num">${p.stock}</td>
      <td class="num">${p.sold}</td>
      <td><button class="row-action" data-edit-product="${p.id}">Edit</button><button class="row-action danger" data-del-product="${p.id}">Del</button></td>
    </tr>`;
  }).join('');
  $('#productsBody').innerHTML = rows || `<tr><td colspan="10" style="text-align:center;color:var(--text-muted);padding:30px">No products yet. Click "+ Add Product".</td></tr>`;

  // Margin distribution
  drawChart('chart_prodMargin', 'bar', {
    labels: state.products.map(p => p.sku),
    datasets: [{
      label: 'Margin %',
      data: state.products.map(p => p.price ? ((p.price - p.cost) / p.price * 100) : 0),
      backgroundColor: state.products.map(p => {
        const m = p.price ? ((p.price - p.cost) / p.price * 100) : 0;
        return m > 70 ? '#00b894' : m > 40 ? '#0984e3' : '#e17055';
      })
    }]
  });

  // Revenue by category
  const catMap = {};
  state.products.forEach(p => { catMap[p.category] = (catMap[p.category] || 0) + p.sold * p.price; });
  drawChart('chart_prodCat', 'doughnut', {
    labels: Object.keys(catMap),
    datasets: [{ data: Object.values(catMap), backgroundColor: ['#0984e3', '#00b894', '#6c5ce7', '#e17055', '#fdcb6e', '#95a5a6', '#74b9ff'] }]
  });
}

// ===== INVENTORY =====
function renderInventory() {
  const totalSku = state.products.length;
  const lowStock = state.products.filter(p => p.stock > 0 && p.stock <= p.reorder);
  const outOfStock = state.products.filter(p => p.stock === 0);
  const value = state.products.reduce((s, p) => s + p.cost * p.stock, 0);
  const turnRate = 4.2;
  $('#kpiInventory').innerHTML = kpiBlock([
    { label: 'SKUs Tracked', val: fmt(totalSku) },
    { label: 'Inventory Value', val: money(value) },
    { label: 'Low Stock', val: fmt(lowStock.length), pos: lowStock.length === 0 },
    { label: 'Out of Stock', val: fmt(outOfStock.length), pos: outOfStock.length === 0 },
    { label: 'Turnover Rate', val: turnRate.toFixed(1) + 'x' },
    { label: 'Days of Supply', val: Math.round(365 / turnRate) + ' d' },
  ]);

  const catMap = {};
  state.products.forEach(p => { catMap[p.category] = (catMap[p.category] || 0) + p.cost * p.stock; });
  drawChart('chart_invCat', 'bar', {
    labels: Object.keys(catMap),
    datasets: [{ label: 'Value ($)', data: Object.values(catMap), backgroundColor: '#0984e3' }]
  });

  $('#lowStockList').innerHTML = [...lowStock, ...outOfStock].slice(0, 10).map(p => `
    <div class="top-product">
      <div class="top-product-info">
        <strong>${escape(p.name)}</strong>
        <span>${escape(p.sku)} · ${p.stock === 0 ? 'Out of stock' : `${p.stock} left · reorder at ${p.reorder}`}</span>
      </div>
      <span class="status-tag ${p.stock === 0 ? 'bad' : 'warn'}">${p.stock === 0 ? 'URGENT' : 'LOW'}</span>
    </div>
  `).join('') || `<p class="note">All stock levels are healthy. 🎉</p>`;

  $('#reorderBody').innerHTML = state.products.filter(p => p.stock <= p.reorder).map(p => {
    const suggested = Math.max(p.reorder * 2 - p.stock, p.reorder);
    const cost = suggested * p.cost;
    const status = p.stock === 0 ? 'URGENT' : 'LOW';
    return `<tr>
      <td><code>${escape(p.sku)}</code></td>
      <td>${escape(p.name)}</td>
      <td class="num">${p.stock}</td>
      <td class="num">${p.reorder}</td>
      <td class="num">${suggested}</td>
      <td class="num">${money(cost, 2)}</td>
      <td><span class="status-tag ${p.stock === 0 ? 'bad' : 'warn'}">${status}</span></td>
    </tr>`;
  }).join('') || `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:30px">No reorders needed — inventory is healthy.</td></tr>`;
}

// ===== SUPPLY CHAIN =====
function renderSupply() {
  const avgLead = state.suppliers.length ? state.suppliers.reduce((s, x) => s + x.leadDays, 0) / state.suppliers.length : 0;
  const avgRel = state.suppliers.length ? state.suppliers.reduce((s, x) => s + x.reliability, 0) / state.suppliers.length : 0;
  const openPO = state.purchaseOrders.filter(p => p.status !== 'Received').length;
  const openPOValue = state.purchaseOrders.filter(p => p.status !== 'Received').reduce((s, p) => s + p.amount, 0);
  $('#kpiSupply').innerHTML = kpiBlock([
    { label: 'Suppliers', val: fmt(state.suppliers.length) },
    { label: 'Avg Lead Time', val: avgLead.toFixed(1) + ' days' },
    { label: 'Avg Reliability', val: pct(avgRel, 0) },
    { label: 'Open POs', val: fmt(openPO) },
    { label: 'Open PO Value', val: money(openPOValue) },
  ]);

  $('#suppliersBody').innerHTML = state.suppliers.map(s => `
    <tr>
      <td><strong>${escape(s.name)}</strong></td>
      <td>${escape(s.category)}</td>
      <td class="num">${s.leadDays} d</td>
      <td class="num">${s.moq}</td>
      <td class="num">${s.reliability}%</td>
      <td><button class="row-action danger" data-del-supplier="${s.id}">Remove</button></td>
    </tr>`).join('');

  $('#posBody').innerHTML = state.purchaseOrders.map(p => `
    <tr>
      <td><code>${escape(p.id)}</code></td>
      <td>${escape(p.supplier)}</td>
      <td class="num">${money(p.amount)}</td>
      <td>${p.eta}</td>
      <td><span class="status-tag ${p.status === 'In Transit' ? 'info' : p.status === 'Pending' ? 'warn' : 'ok'}">${p.status}</span></td>
    </tr>`).join('');

  drawChart('chart_leadTime', 'bar', {
    labels: state.suppliers.map(s => s.name),
    datasets: [{ label: 'Lead Time (days)', data: state.suppliers.map(s => s.leadDays), backgroundColor: '#6c5ce7' }]
  });
}

// ===== ORDERS =====
function renderOrders() {
  const total = state.orders.reduce((s, o) => s + (o.status !== 'Refunded' ? o.total : 0), 0);
  const refunded = state.orders.filter(o => o.status === 'Refunded').reduce((s, o) => s + o.total, 0);
  const units = state.orders.reduce((s, o) => s + o.items, 0);
  const aov = state.orders.length ? total / state.orders.filter(o => o.status !== 'Refunded').length : 0;
  $('#kpiOrders').innerHTML = kpiBlock([
    { label: 'Total Orders', val: fmt(state.orders.length) },
    { label: 'Revenue', val: money(total) },
    { label: 'Units Sold', val: fmt(units) },
    { label: 'AOV', val: money(aov, 2) },
    { label: 'Refunded', val: money(refunded), pos: false },
    { label: 'Refund Rate', val: pct(state.orders.length ? (state.orders.filter(o => o.status === 'Refunded').length / state.orders.length * 100) : 0) },
  ]);

  // Daily sales
  const byDay = {};
  state.orders.forEach(o => { if (o.status !== 'Refunded') byDay[o.date] = (byDay[o.date] || 0) + o.total; });
  const days = Object.keys(byDay).sort();
  drawChart('chart_dailySales', 'line', {
    labels: days,
    datasets: [{ label: 'Revenue', data: days.map(d => byDay[d]), borderColor: '#0984e3', backgroundColor: 'rgba(9,132,227,0.1)', fill: true, tension: 0.3 }]
  });

  const byChannel = {};
  state.orders.forEach(o => { if (o.status !== 'Refunded') byChannel[o.channel] = (byChannel[o.channel] || 0) + o.total; });
  drawChart('chart_channels', 'doughnut', {
    labels: Object.keys(byChannel),
    datasets: [{ data: Object.values(byChannel), backgroundColor: ['#0984e3', '#00b894', '#6c5ce7', '#fdcb6e'] }]
  });

  $('#ordersBody').innerHTML = [...state.orders].slice(0, 20).map(o => `
    <tr>
      <td><code>${escape(o.id)}</code></td>
      <td>${o.date}</td>
      <td>${escape(o.customer)}</td>
      <td>${escape(o.channel)}</td>
      <td class="num">${o.items}</td>
      <td class="num">${money(o.total, 2)}</td>
      <td><span class="status-tag ${o.status === 'Completed' ? 'ok' : 'bad'}">${o.status}</span></td>
    </tr>`).join('');
}

// ===== COSTS =====
function renderCosts() {
  const fixedTotal = state.fixedCosts.reduce((s, f) => s + f.amount, 0);
  const varTotal = state.expenses.filter(e => e.type === 'Variable').reduce((s, e) => s + e.amount, 0);
  const annualFixed = fixedTotal * 12;
  $('#kpiCosts').innerHTML = kpiBlock([
    { label: 'Monthly Fixed', val: money(fixedTotal) },
    { label: 'Annual Fixed', val: money(annualFixed) },
    { label: 'Variable (YTD)', val: money(varTotal) },
    { label: 'Total Burn/mo', val: money(fixedTotal + varTotal / 4) },
    { label: '# Categories', val: fmt(new Set(state.fixedCosts.map(f => f.category)).size) },
  ]);

  $('#fixedCostsList').innerHTML = state.fixedCosts.map(f => `
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border-light);font-size:13px">
      <div><strong>${escape(f.name)}</strong><span style="color:var(--text-muted);margin-left:8px;font-size:11px">${escape(f.category)}</span></div>
      <div style="font-variant-numeric:tabular-nums;font-weight:600">${money(f.amount)}</div>
    </div>`).join('');
  $('#totalFixed').textContent = money(fixedTotal);

  const catMap = {};
  [...state.fixedCosts, ...state.expenses].forEach(x => {
    catMap[x.category] = (catMap[x.category] || 0) + x.amount;
  });
  drawChart('chart_costPie', 'pie', {
    labels: Object.keys(catMap),
    datasets: [{ data: Object.values(catMap), backgroundColor: ['#0984e3', '#00b894', '#6c5ce7', '#e17055', '#fdcb6e', '#74b9ff', '#95a5a6'] }]
  });

  $('#expensesBody').innerHTML = state.expenses.map(e => `
    <tr>
      <td>${e.date}</td>
      <td>${escape(e.category)}</td>
      <td>${escape(e.description)}</td>
      <td><span class="status-tag ${e.type === 'Fixed' ? 'info' : 'warn'}">${e.type}</span></td>
      <td class="num">${money(e.amount, 2)}</td>
      <td><button class="row-action danger" data-del-expense="${e.id}">Del</button></td>
    </tr>`).join('');
}

// ===== PRICING =====
function renderPricing() {
  bindRange('pc_cost', v => '$' + Number(v).toFixed(2), updatePricing);
  bindRange('pc_margin', v => v + '%', updatePricing);
  bindRange('pc_proc', v => v + '%', updatePricing);
  bindRange('pc_ship', v => '$' + Number(v).toFixed(2), updatePricing);
  updatePricing();

  // Bundle builder
  $('#bundleBuilder').innerHTML = `
    <table class="data-table"><thead><tr><th>Product</th><th class="num">Individual</th><th class="num">Bundle (-15%)</th><th class="num">Savings</th></tr></thead>
    <tbody>
      ${state.products.slice(0, 5).map((p, i, a) => {
        if (i === 0) return '';
        const combo = a.slice(0, i + 1);
        const indiv = combo.reduce((s, x) => s + x.price, 0);
        const bundle = indiv * 0.85;
        return `<tr><td>${combo.map(x => escape(x.name)).join(' + ')}</td><td class="num">${money(indiv, 2)}</td><td class="num" style="color:var(--green);font-weight:700">${money(bundle, 2)}</td><td class="num">${money(indiv - bundle, 2)}</td></tr>`;
      }).join('')}
    </tbody></table>
  `;
}

function updatePricing() {
  const cost = +$('#pc_cost').value;
  const margin = +$('#pc_margin').value;
  const proc = +$('#pc_proc').value;
  const ship = +$('#pc_ship').value;
  const basePrice = margin < 100 ? cost / (1 - margin / 100) : cost * 10;
  const price = (basePrice + ship) / (1 - proc / 100);
  const gross = price - cost - ship - price * proc / 100;
  const markup = cost ? ((price - cost) / cost * 100) : 0;
  const fixedMonthly = state.fixedCosts.reduce((s, f) => s + f.amount, 0);
  const breakeven = gross > 0 ? Math.ceil(fixedMonthly / gross) : '—';

  $('#pc_price').textContent = money(price, 2);
  $('#pc_gross').textContent = money(gross, 2);
  $('#pc_markup').textContent = pct(markup, 0);
  $('#pc_be').textContent = breakeven === '—' ? '—' : fmt(breakeven) + ' / mo';

  // Pricing strategy comparison
  const strategies = {
    'Cost-Plus (50%)': cost * 1.5,
    'Competitive': cost * 2.0,
    'Premium': cost * 3.5,
    'Penetration': cost * 1.3,
    'Target Margin': price,
  };
  drawChart('chart_pricingStrat', 'bar', {
    labels: Object.keys(strategies),
    datasets: [{ label: 'Price', data: Object.values(strategies), backgroundColor: ['#95a5a6', '#0984e3', '#6c5ce7', '#fdcb6e', '#00b894'] }]
  });
}

// ===== PROFITABILITY =====
function renderProfitability() {
  const t = computeTotals();
  const opex = t.fixedMonthly * 12;
  const netProfit = t.revenue - t.cogs - opex - t.variableExpenses;
  const netMargin = t.revenue ? (netProfit / t.revenue * 100) : 0;
  const contribMargin = t.revenue ? ((t.revenue - t.cogs - t.variableExpenses) / t.revenue * 100) : 0;
  const breakeven = contribMargin > 0 ? opex / (contribMargin / 100) : 0;
  $('#kpiProfit').innerHTML = kpiBlock([
    { label: 'Revenue', val: money(t.revenue) },
    { label: 'Gross Profit', val: money(t.grossProfit), pos: t.grossProfit >= 0 },
    { label: 'Gross Margin', val: pct(t.margin) },
    { label: 'Net Profit', val: money(netProfit), pos: netProfit >= 0 },
    { label: 'Net Margin', val: pct(netMargin) },
    { label: 'Break-even', val: money(breakeven) },
    { label: 'Contrib. Margin', val: pct(contribMargin) },
  ]);

  $('#plTable').innerHTML = `
    <tr><td><strong>Revenue</strong></td><td>${money(t.revenue)}</td></tr>
    <tr class="indent"><td>Orders</td><td>${fmt(t.orders)}</td></tr>
    <tr class="indent"><td>AOV</td><td>${money(t.aov, 2)}</td></tr>
    <tr><td><strong>Cost of Goods Sold</strong></td><td>-${money(t.cogs)}</td></tr>
    <tr class="subtotal"><td>Gross Profit</td><td>${money(t.grossProfit)} (${pct(t.margin)})</td></tr>
    <tr><td><strong>Operating Expenses</strong></td><td>-${money(opex)}</td></tr>
    <tr class="indent"><td>Fixed (annual)</td><td>${money(opex)}</td></tr>
    <tr><td><strong>Variable Expenses</strong></td><td>-${money(t.variableExpenses)}</td></tr>
    <tr class="total"><td>Net Profit</td><td style="color:${netProfit >= 0 ? 'var(--green)' : 'var(--red)'}">${money(netProfit)}</td></tr>
    <tr><td>Net Margin</td><td>${pct(netMargin)}</td></tr>
  `;

  // Break-even chart
  const units = [0, 100, 250, 500, 750, 1000, 1500, 2000];
  const avgPrice = state.products.length ? state.products.reduce((s, p) => s + p.price, 0) / state.products.length : 20;
  const avgCost = state.products.length ? state.products.reduce((s, p) => s + p.cost, 0) / state.products.length : 5;
  drawChart('chart_breakeven', 'line', {
    labels: units.map(u => u + ' units'),
    datasets: [
      { label: 'Revenue', data: units.map(u => u * avgPrice), borderColor: '#00b894', tension: 0.2 },
      { label: 'Total Cost', data: units.map(u => opex + u * avgCost), borderColor: '#e17055', tension: 0.2 },
    ]
  });

  // Contribution margin by product
  const sortedP = [...state.products].sort((a, b) => (b.price - b.cost) - (a.price - a.cost));
  drawChart('chart_contribMargin', 'bar', {
    labels: sortedP.map(p => p.sku),
    datasets: [{
      label: 'Contribution $/unit',
      data: sortedP.map(p => p.price - p.cost),
      backgroundColor: '#0984e3'
    }]
  });
}

// ===== CASH FLOW =====
function renderCashflow() {
  bindRange('cf_start', v => '$' + fmt(v), updateCashflow);
  bindRange('cf_rev', v => '$' + fmt(v), updateCashflow);
  bindRange('cf_exp', v => '$' + fmt(v), updateCashflow);
  bindRange('cf_growth', v => v + '%', updateCashflow);
  updateCashflow();
}

function updateCashflow() {
  const start = +$('#cf_start').value;
  const rev = +$('#cf_rev').value;
  const exp = +$('#cf_exp').value;
  const growth = +$('#cf_growth').value / 100;

  const months = 24;
  const series = [];
  let cash = start, beMonth = null;
  for (let m = 0; m < months; m++) {
    const revM = rev * Math.pow(1 + growth, m);
    const net = revM - exp;
    cash += net;
    if (beMonth === null && revM >= exp) beMonth = m + 1;
    series.push(cash);
  }
  const burn = exp - rev;
  const runway = burn > 0 ? (start / burn).toFixed(1) + ' mo' : '∞ (profitable)';

  const t = computeTotals();
  $('#kpiCash').innerHTML = kpiBlock([
    { label: 'Cash Position', val: money(start) },
    { label: 'Net Burn/mo', val: burn > 0 ? money(burn) : money(-burn) + ' surplus', pos: burn <= 0 },
    { label: 'Runway', val: runway, pos: burn <= 0 },
    { label: 'Working Capital', val: money(t.stockValue + start * 0.3) },
    { label: '12-mo End Cash', val: money(series[11]), pos: series[11] >= 0 },
  ]);

  $('#cf_burn').textContent = burn > 0 ? money(burn) : money(-burn) + ' +';
  $('#cf_runway').textContent = runway;
  $('#cf_beMonth').textContent = beMonth ? 'Month ' + beMonth : 'Already profitable';
  $('#cf_end').textContent = money(series[11]);

  drawChart('chart_cash', 'line', {
    labels: Array.from({ length: months }, (_, i) => 'M' + (i + 1)),
    datasets: [{
      label: 'Cash Balance', data: series,
      borderColor: series[series.length - 1] >= 0 ? '#00b894' : '#e17055',
      backgroundColor: series[series.length - 1] >= 0 ? 'rgba(0,184,148,0.1)' : 'rgba(225,112,85,0.1)',
      fill: true, tension: 0.3
    }]
  });
}

// ===== FORECAST =====
function renderForecast() {
  ['fc_cust', 'fc_aov', 'fc_days', 'fc_growth', 'fc_season', 'fc_horizon'].forEach(id => {
    const $el = $('#' + id);
    const formatters = {
      fc_cust: v => v,
      fc_aov: v => '$' + Number(v).toFixed(2),
      fc_days: v => v,
      fc_growth: v => v + '%',
      fc_season: v => v + '%',
      fc_horizon: v => v,
    };
    bindRange(id, formatters[id], updateForecast);
  });
  updateForecast();
}

function updateForecast() {
  const cust = +$('#fc_cust').value;
  const aov = +$('#fc_aov').value;
  const days = +$('#fc_days').value;
  const growth = +$('#fc_growth').value / 100;
  const season = +$('#fc_season').value / 100;
  const horizon = +$('#fc_horizon').value;

  const labels = [], data = [];
  for (let m = 0; m < horizon; m++) {
    const seasonFactor = 1 + Math.sin((m / 12) * Math.PI * 2) * season;
    const monthly = cust * aov * days * 4.33 * Math.pow(1 + growth, m) * seasonFactor;
    labels.push('M' + (m + 1));
    data.push(Math.round(monthly));
  }

  drawChart('chart_forecast', 'line', {
    labels,
    datasets: [{
      label: 'Revenue', data,
      borderColor: '#0984e3',
      backgroundColor: 'rgba(9,132,227,0.1)',
      fill: true, tension: 0.35
    }]
  });

  // Year table
  const years = Math.ceil(horizon / 12);
  let html = '<thead><tr><th>Year</th><th class="num">Revenue</th><th class="num">Avg Monthly</th><th class="num">YoY Growth</th></tr></thead><tbody>';
  let prev = 0;
  for (let y = 0; y < years; y++) {
    const slice = data.slice(y * 12, (y + 1) * 12);
    const sum = slice.reduce((s, x) => s + x, 0);
    const avg = sum / (slice.length || 1);
    const yoy = prev ? ((sum / prev - 1) * 100) : 0;
    html += `<tr><td>Year ${y + 1}</td><td class="num">${money(sum)}</td><td class="num">${money(avg)}</td><td class="num">${y === 0 ? '—' : pct(yoy)}</td></tr>`;
    prev = sum;
  }
  html += '</tbody>';
  $('#forecastTable').innerHTML = html;
}

// ===== SCENARIOS =====
function renderScenarios() {
  ['sc_w_rev', 'sc_w_cost', 'sc_bst_rev', 'sc_bst_cost'].forEach(id => {
    bindRange(id, v => Number(v).toFixed(2) + 'x', updateScenarios);
  });
  updateScenarios();
}

function updateScenarios() {
  const t = computeTotals();
  const opex = t.fixedMonthly * 12;
  const baseRev = t.revenue * 4;
  const baseCogs = t.cogs * 4;
  const baseOpex = opex;

  const worst = {
    rev: baseRev * +$('#sc_w_rev').value,
    cogs: baseCogs * +$('#sc_w_cost').value,
    opex: baseOpex * +$('#sc_w_cost').value,
  };
  const best = {
    rev: baseRev * +$('#sc_bst_rev').value,
    cogs: baseCogs * +$('#sc_bst_cost').value,
    opex: baseOpex * +$('#sc_bst_cost').value,
  };
  const base = { rev: baseRev, cogs: baseCogs, opex: baseOpex };

  const render = (sel, s) => {
    const profit = s.rev - s.cogs - s.opex;
    const margin = s.rev ? (profit / s.rev * 100) : 0;
    $(sel).innerHTML = `
      <div class="sr-row"><span>Revenue</span><strong>${money(s.rev)}</strong></div>
      <div class="sr-row"><span>COGS</span><strong>-${money(s.cogs)}</strong></div>
      <div class="sr-row"><span>OpEx</span><strong>-${money(s.opex)}</strong></div>
      <div class="sr-row"><span>Net Profit</span><strong style="color:${profit >= 0 ? 'var(--green)' : 'var(--red)'}">${money(profit)}</strong></div>
      <div class="sr-row"><span>Margin</span><strong>${pct(margin)}</strong></div>
    `;
  };
  render('#sc_w_res', worst);
  render('#sc_b_res', base);
  render('#sc_bst_res', best);

  drawChart('chart_scenarios', 'bar', {
    labels: ['Worst', 'Base', 'Best'],
    datasets: [
      { label: 'Revenue', data: [worst.rev, base.rev, best.rev], backgroundColor: '#0984e3' },
      { label: 'Costs', data: [worst.cogs + worst.opex, base.cogs + base.opex, best.cogs + best.opex], backgroundColor: '#e17055' },
      { label: 'Profit', data: [worst.rev - worst.cogs - worst.opex, base.rev - base.cogs - base.opex, best.rev - best.cogs - best.opex], backgroundColor: '#00b894' },
    ]
  });

  // Sensitivity table: price (rows) × volume (cols)
  const priceMultipliers = [0.8, 0.9, 1.0, 1.1, 1.2];
  const volMultipliers = [0.7, 0.85, 1.0, 1.15, 1.3];
  let html = `<thead><tr><th></th>${volMultipliers.map(v => `<th>${(v * 100).toFixed(0)}% volume</th>`).join('')}</tr></thead><tbody>`;
  priceMultipliers.forEach(p => {
    html += `<tr><td class="axis">${(p * 100).toFixed(0)}% price</td>`;
    volMultipliers.forEach(v => {
      const rev = baseRev * p * v;
      const cogs = baseCogs * v;
      const profit = rev - cogs - baseOpex;
      const color = profit >= 0 ? `rgba(0,184,148,${Math.min(0.45, profit / baseRev)})` : `rgba(225,112,85,${Math.min(0.45, Math.abs(profit) / baseRev)})`;
      html += `<td style="background:${color}">${money(profit)}</td>`;
    });
    html += '</tr>';
  });
  html += '</tbody>';
  $('#sensTable').innerHTML = html;
}

// ===== REPORTS =====
function generateReport(type) {
  const t = computeTotals();
  const out = $('#reportOutput');
  const title = $('#reportTitle');
  const body = $('#reportBody');
  out.hidden = false;

  if (type === 'pl') {
    title.textContent = 'Profit & Loss Statement';
    const opex = t.fixedMonthly * 12;
    const net = t.revenue - t.cogs - opex - t.variableExpenses;
    body.innerHTML = `
      <table class="pl-table">
        <tr><td><strong>${escape(state.settings.name)}</strong></td><td>${new Date().toISOString().slice(0, 10)}</td></tr>
        <tr><td>Revenue</td><td>${money(t.revenue)}</td></tr>
        <tr class="indent"><td>Orders</td><td>${fmt(t.orders)}</td></tr>
        <tr><td>Cost of Goods Sold</td><td>(${money(t.cogs)})</td></tr>
        <tr class="subtotal"><td>Gross Profit</td><td>${money(t.grossProfit)}</td></tr>
        <tr><td>Operating Expenses (annualized)</td><td>(${money(opex)})</td></tr>
        <tr><td>Variable Expenses</td><td>(${money(t.variableExpenses)})</td></tr>
        <tr class="total"><td>Net Profit</td><td>${money(net)}</td></tr>
      </table>`;
  } else if (type === 'inv') {
    title.textContent = 'Inventory Report';
    body.innerHTML = `<table class="data-table"><thead><tr><th>SKU</th><th>Name</th><th class="num">Stock</th><th class="num">Cost</th><th class="num">Value</th></tr></thead><tbody>
      ${state.products.map(p => `<tr><td>${escape(p.sku)}</td><td>${escape(p.name)}</td><td class="num">${p.stock}</td><td class="num">${money(p.cost, 2)}</td><td class="num">${money(p.stock * p.cost, 2)}</td></tr>`).join('')}
      <tr style="font-weight:700;background:var(--border-light)"><td colspan="4">TOTAL</td><td class="num">${money(state.products.reduce((s, p) => s + p.stock * p.cost, 0), 2)}</td></tr>
      </tbody></table>`;
  } else if (type === 'investor') {
    title.textContent = 'Investor Snapshot';
    const opex = t.fixedMonthly * 12;
    const net = t.revenue - t.cogs - opex - t.variableExpenses;
    body.innerHTML = `
      <div class="grid g3" style="margin-bottom:18px">
        <div class="kpi"><div class="kpi-label">Revenue (YTD)</div><div class="kpi-val">${money(t.revenue)}</div></div>
        <div class="kpi"><div class="kpi-label">Gross Margin</div><div class="kpi-val">${pct(t.margin)}</div></div>
        <div class="kpi"><div class="kpi-label">Net Profit</div><div class="kpi-val ${net >= 0 ? '' : 'neg'}">${money(net)}</div></div>
      </div>
      <p style="font-size:13px;color:var(--text-muted)">${escape(state.settings.name)} — ${escape(state.settings.industry)}. ${state.products.length} SKUs across ${new Set(state.products.map(p => p.category)).size} categories. ${state.suppliers.length} active suppliers. Inventory valued at ${money(t.stockValue)} (retail: ${money(t.stockRetail)}).</p>`;
  } else if (type === 'expense') {
    title.textContent = 'Expense Report';
    const catMap = {};
    [...state.fixedCosts.map(f => ({ ...f, type: 'Fixed' })), ...state.expenses].forEach(e => {
      catMap[e.category] = (catMap[e.category] || 0) + e.amount;
    });
    body.innerHTML = `<table class="data-table"><thead><tr><th>Category</th><th class="num">Total</th></tr></thead><tbody>
      ${Object.entries(catMap).map(([k, v]) => `<tr><td>${escape(k)}</td><td class="num">${money(v, 2)}</td></tr>`).join('')}
      </tbody></table>`;
  } else if (type === 'sales') {
    title.textContent = 'Sales Report';
    body.innerHTML = `<table class="data-table"><thead><tr><th>Order#</th><th>Date</th><th>Channel</th><th class="num">Items</th><th class="num">Total</th></tr></thead><tbody>
      ${state.orders.map(o => `<tr><td>${escape(o.id)}</td><td>${o.date}</td><td>${escape(o.channel)}</td><td class="num">${o.items}</td><td class="num">${money(o.total, 2)}</td></tr>`).join('')}</tbody></table>`;
  } else if (type === 'backup') {
    downloadJSON(state, 'profitly-backup-' + new Date().toISOString().slice(0, 10) + '.json');
    toast('Backup downloaded');
    out.hidden = true;
    return;
  }
  out.scrollIntoView({ behavior: 'smooth' });
}

function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ===== SETTINGS =====
function renderSettings() {
  $('#set_name').value = state.settings.name;
  $('#set_industry').value = state.settings.industry;
  $('#set_currency').value = state.settings.currency;
  $('#set_fy').value = state.settings.fy;
}

// ===== MODALS =====
function openModal(title, bodyHTML, onSave) {
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = bodyHTML;
  $('#modalOverlay').hidden = false;
  $('#modalSave').onclick = () => {
    if (onSave) onSave();
    closeModal();
  };
}
function closeModal() { $('#modalOverlay').hidden = true; }

function openProductModal(id) {
  const p = id ? state.products.find(x => x.id === id) : { id: uid('P'), sku: '', name: '', category: '', supplier: '', cost: 0, price: 0, stock: 0, reorder: 5, sold: 0 };
  openModal(id ? 'Edit Product' : 'Add Product', `
    <div class="form-group"><label>SKU</label><input id="m_sku" value="${escape(p.sku)}"></div>
    <div class="form-group"><label>Name</label><input id="m_name" value="${escape(p.name)}"></div>
    <div class="grid g2">
      <div class="form-group"><label>Category</label><input id="m_cat" value="${escape(p.category)}"></div>
      <div class="form-group"><label>Supplier</label><input id="m_sup" value="${escape(p.supplier)}"></div>
    </div>
    <div class="grid g2">
      <div class="form-group"><label>Cost ($)</label><input id="m_cost" type="number" step="0.01" value="${p.cost}"></div>
      <div class="form-group"><label>Price ($)</label><input id="m_price" type="number" step="0.01" value="${p.price}"></div>
    </div>
    <div class="grid g2">
      <div class="form-group"><label>Stock</label><input id="m_stock" type="number" value="${p.stock}"></div>
      <div class="form-group"><label>Reorder At</label><input id="m_reorder" type="number" value="${p.reorder}"></div>
    </div>
  `, () => {
    const data = {
      id: p.id,
      sku: $('#m_sku').value.trim(),
      name: $('#m_name').value.trim(),
      category: $('#m_cat').value.trim() || 'Uncategorized',
      supplier: $('#m_sup').value.trim() || 'Unknown',
      cost: +$('#m_cost').value || 0,
      price: +$('#m_price').value || 0,
      stock: +$('#m_stock').value || 0,
      reorder: +$('#m_reorder').value || 5,
      sold: p.sold,
    };
    if (!data.name) { toast('Name required'); return; }
    const idx = state.products.findIndex(x => x.id === p.id);
    if (idx >= 0) state.products[idx] = data; else state.products.push(data);
    persist(); renderProducts();
    toast(id ? 'Product updated' : 'Product added');
  });
}

function openSupplierModal() {
  openModal('Add Supplier', `
    <div class="form-group"><label>Name</label><input id="m_sname"></div>
    <div class="form-group"><label>Category</label><input id="m_scat"></div>
    <div class="grid g2">
      <div class="form-group"><label>Lead Time (days)</label><input id="m_lead" type="number" value="7"></div>
      <div class="form-group"><label>Min Order Qty</label><input id="m_moq" type="number" value="50"></div>
    </div>
    <div class="form-group"><label>Reliability %</label><input id="m_rel" type="number" value="90"></div>
  `, () => {
    const name = $('#m_sname').value.trim();
    if (!name) { toast('Name required'); return; }
    state.suppliers.push({
      id: uid('S'), name,
      category: $('#m_scat').value.trim() || 'General',
      leadDays: +$('#m_lead').value || 7,
      moq: +$('#m_moq').value || 1,
      reliability: Math.min(100, Math.max(0, +$('#m_rel').value || 90)),
    });
    persist(); renderSupply();
    toast('Supplier added');
  });
}

function openOrderModal() {
  openModal('Record Sale', `
    <div class="form-group"><label>Customer</label><input id="m_cust" value="Walk-in"></div>
    <div class="grid g2">
      <div class="form-group"><label>Channel</label><select id="m_chan"><option>In-Store</option><option>Online</option><option>Pop-up</option><option>Wholesale</option></select></div>
      <div class="form-group"><label>Items</label><input id="m_items" type="number" value="1"></div>
    </div>
    <div class="form-group"><label>Total ($)</label><input id="m_total" type="number" step="0.01" value="25.00"></div>
  `, () => {
    const total = +$('#m_total').value || 0;
    if (total <= 0) { toast('Total must be positive'); return; }
    state.orders.unshift({
      id: 'ORD-' + (2000 + state.orders.length),
      date: new Date().toISOString().slice(0, 10),
      customer: $('#m_cust').value.trim() || 'Walk-in',
      channel: $('#m_chan').value,
      items: +$('#m_items').value || 1,
      total,
      status: 'Completed'
    });
    persist(); renderOrders();
    toast('Sale recorded');
  });
}

function openExpenseModal() {
  openModal('Add Expense', `
    <div class="grid g2">
      <div class="form-group"><label>Date</label><input id="m_date" type="date" value="${new Date().toISOString().slice(0, 10)}"></div>
      <div class="form-group"><label>Type</label><select id="m_type"><option>Fixed</option><option>Variable</option></select></div>
    </div>
    <div class="form-group"><label>Category</label><input id="m_ecat" value="Operations"></div>
    <div class="form-group"><label>Description</label><input id="m_desc"></div>
    <div class="form-group"><label>Amount ($)</label><input id="m_amount" type="number" step="0.01" value="0"></div>
  `, () => {
    const amount = +$('#m_amount').value;
    if (amount <= 0) { toast('Amount required'); return; }
    state.expenses.unshift({
      id: uid('E'),
      date: $('#m_date').value,
      category: $('#m_ecat').value.trim() || 'Operations',
      description: $('#m_desc').value.trim() || '—',
      type: $('#m_type').value,
      amount,
    });
    persist(); renderCosts();
    toast('Expense logged');
  });
}

// ===== CHART HELPER =====
function drawChart(id, type, data) {
  const el = document.getElementById(id);
  if (!el) return;
  if (CHARTS[id]) CHARTS[id].destroy();
  const isDark = state.settings.theme === 'dark';
  Chart.defaults.color = isDark ? '#8a94a0' : '#95a5a6';
  Chart.defaults.borderColor = isDark ? '#2a3138' : '#e5e8ec';
  CHARTS[id] = new Chart(el, {
    type, data,
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { labels: { font: { size: 11 }, usePointStyle: true } }
      },
      scales: type === 'pie' || type === 'doughnut' ? {} : {
        y: { grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' } },
        x: { grid: { display: false } }
      }
    }
  });
}

// ===== INPUT HELPERS =====
function bindRange(id, fmtFn, onChange) {
  const el = $('#' + id);
  const val = $('#v_' + id);
  if (!el || !val) return;
  const update = () => { val.textContent = fmtFn(el.value); if (onChange) onChange(); };
  el.oninput = update;
  update();
}

function escape(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ===== THEME =====
function applyTheme(theme) {
  state.settings.theme = theme;
  document.documentElement.setAttribute('data-theme', theme === 'auto' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme);
  $$('.theme-opt').forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
  persist();
}
function applyAccent(color) {
  state.settings.accent = color;
  document.documentElement.style.setProperty('--accent', color);
  $$('.color-opt').forEach(b => b.classList.toggle('active', b.dataset.color === color));
  persist();
}

// ===== EVENT BINDINGS =====
function bindEvents() {
  // Nav
  $$('.tab-btn').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
  $$('[data-go]').forEach(b => b.onclick = () => switchTab(b.dataset.go));

  // Mobile
  $('#mobileToggle').onclick = () => $('#sidebar').classList.toggle('open');

  // Reset
  $('#resetBtn').onclick = () => {
    if (confirm('Reset all data to demo values?')) {
      loadDemoData();
      renderTab($('.tab-btn.active').dataset.tab);
      toast('Demo data reloaded');
    }
  };

  // Modals
  $('#modalClose').onclick = closeModal;
  $('#modalCancel').onclick = closeModal;
  $('#modalOverlay').onclick = e => { if (e.target.id === 'modalOverlay') closeModal(); };

  $('#addProductBtn').onclick = () => openProductModal();
  $('#addSupplierBtn').onclick = openSupplierModal;
  $('#addOrderBtn').onclick = openOrderModal;
  $('#addCostBtn').onclick = openExpenseModal;

  $('#productSearch').oninput = renderProducts;

  // Table delegation
  document.body.addEventListener('click', e => {
    const t = e.target;
    if (t.dataset.editProduct) openProductModal(t.dataset.editProduct);
    if (t.dataset.delProduct) {
      if (confirm('Delete this product?')) {
        state.products = state.products.filter(p => p.id !== t.dataset.delProduct);
        persist(); renderProducts(); toast('Product deleted');
      }
    }
    if (t.dataset.delSupplier) {
      state.suppliers = state.suppliers.filter(s => s.id !== t.dataset.delSupplier);
      persist(); renderSupply(); toast('Supplier removed');
    }
    if (t.dataset.delExpense) {
      state.expenses = state.expenses.filter(e => e.id !== t.dataset.delExpense);
      persist(); renderCosts(); toast('Expense deleted');
    }
    if (t.dataset.report) generateReport(t.dataset.report);
  });

  // Settings
  ['set_name', 'set_industry', 'set_currency', 'set_fy'].forEach(id => {
    const el = $('#' + id); if (!el) return;
    el.onchange = () => {
      state.settings[id.slice(4)] = el.value;
      persist(); toast('Settings saved');
    };
  });
  $$('.theme-opt').forEach(b => b.onclick = () => applyTheme(b.dataset.theme));
  $$('.color-opt').forEach(b => b.onclick = () => applyAccent(b.dataset.color));

  $('#exportData').onclick = () => { downloadJSON(state, 'profitly-export.json'); toast('Data exported'); };
  $('#loadDemo').onclick = () => { if (confirm('Reload demo data? Current data will be replaced.')) { loadDemoData(); toast('Demo loaded'); renderTab($('.tab-btn.active').dataset.tab); } };
  $('#clearData').onclick = () => {
    if (confirm('Delete ALL data? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      ['products', 'suppliers', 'purchaseOrders', 'orders', 'expenses', 'fixedCosts'].forEach(k => state[k] = []);
      toast('All data cleared'); renderTab($('.tab-btn.active').dataset.tab);
    }
  };
  $('#importData').onclick = () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = e => {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          Object.assign(state, JSON.parse(ev.target.result));
          persist(); toast('Data imported'); renderTab($('.tab-btn.active').dataset.tab);
        } catch (err) { toast('Invalid file'); }
      };
      reader.readAsText(file);
    };
    input.click();
  };
}

// ===== INIT =====
function init() {
  hydrate();
  bindEvents();
  if (state.settings.accent) applyAccent(state.settings.accent);
  if (state.settings.theme) applyTheme(state.settings.theme);
  renderTab('home');
}

document.addEventListener('DOMContentLoaded', init);
