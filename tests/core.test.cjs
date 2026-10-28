const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const core = require('../core.js');
const data = require('../data/results.json');

test('all 84 supplied metrics reconcile to the underlying kappa means', () => {
  assert.equal(data.records.length, 28);
  assert.equal(new Set(data.records.map(r => r.dataset + '/' + r.model)).size, 28);
  for (const r of data.records) {
    const k = r.performance.kappa;
    const expected = core.derive(k.frozen.mean, k.finetuned.mean, k.scratch.mean);
    for (const m of ['prr', 'acs', 'pvs']) assert.ok(Math.abs(expected[m] - r.metrics[m]) < 1e-10, `${r.dataset} ${r.model} ${m}`);
  }
});
test('dataset-specific leaders follow the correct direction, including ascending ACS', () => {
  const leaders = { 'BCIC-2A': ['CBraMod', 'EEGPT', 'CBraMod'], 'BCIC-2B': ['LaBraM', 'EEGPT', 'LaBraM'], 'SEED-IV': ['CBraMod', 'EEGPT', 'CBraMod'], pBCIW: ['LaBraM', 'CodeBrain', 'BENDR'] };
  for (const [dataset, expected] of Object.entries(leaders)) {
    const rows = data.records.filter(r => r.dataset === dataset);
    ['pvs', 'prr', 'acs'].forEach((m, i) => assert.equal(core.rank(rows, m)[0].model, expected[i]));
  }
});
test('zero-PVS ties share competition ranks and never become missing values', () => {
  const rows = core.rank(data.records.filter(r => r.dataset === 'BCIC-2A'), 'pvs');
  const zeros = rows.filter(r => r.metrics.pvs === 0);
  assert.equal(zeros.length, 2); assert.equal(zeros[0].rank, 6); assert.equal(zeros[1].rank, 6);
});
test('undefined, negative-readiness, zero-readiness, and ACS boundary cases', () => {
  assert.deepEqual(core.derive(.1, 0, .2), { prr: null, acs: null, pvs: null });
  assert.equal(core.derive(-.1, .4, .2).pvs, null);
  assert.equal(core.derive(0, .4, .2).pvs, 0);
  assert.equal(core.derive(.2, .4, .4).pvs, 0);
  assert.equal(core.derive(.2, .4, .5).pvs, 0);
  assert.equal(core.derive(.6, .4, .2).prr, 1.4999999999999998);
});
test('CSV retains every measurement and spread and guards spreadsheet formulas', () => {
  const text = core.csv(data.records);
  assert.equal(text.trim().split(/\r?\n/).length, 29);
  const columns = text.slice(1).split('\r\n')[0].split(',');
  assert.equal(columns.length, 29);
  assert.ok(text.includes('kappa_frozen_spread'));
  assert.ok(text.includes('0.6293526643577009'));
  const unsafe = { ...data.records[0], model: '=SUM(1,2)' };
  assert.ok(core.csv([unsafe]).includes("'=SUM(1,2)"));
});
test('offline JS data and JSON data are identical; model catalog covers every record', () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../data/results.js'), 'utf8'), context);
  assert.equal(JSON.stringify(context.window.ATLAS_DATA), JSON.stringify(data));
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../data/models.js'), 'utf8'), context);
  assert.deepEqual(Array.from(context.window.ATLAS_MODELS, m => m.id), data.modelOrder);
  context.window.ATLAS_MODELS.forEach(m => assert.ok(new URL(m.paper).protocol === 'https:'));
});
test('entry point references real local assets and no dependency on a CDN or root path', () => {
  const root = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const assets = [...html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css|svg))"/g)].map(m => m[1]);
  assert.equal(assets.length, 7);
  assets.forEach(asset => { assert.ok(!asset.startsWith('/') && !asset.startsWith('http')); assert.ok(fs.existsSync(path.join(root, asset))); });
});
