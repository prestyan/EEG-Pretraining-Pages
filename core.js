/* Numerical and export logic shared by the browser and node's built-in tests. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.AtlasCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const DIRECTIONS = { pvs: -1, prr: -1, acs: 1 };
  function derive(kf, kt, kr) {
    if (![kf, kt, kr].every(Number.isFinite) || kt <= 0) return { prr: null, acs: null, pvs: null };
    const prr = kf / kt, acs = kr / kt;
    return { prr, acs, pvs: prr < 0 ? null : acs >= 1 ? 0 : 2 * prr * (1 - acs) / (prr + 1 - acs) };
  }
  function rank(records, metric) {
    if (!(metric in DIRECTIONS)) throw new Error("Unknown proposed metric");
    const ordered = [...records].sort((a, b) => {
      const av = a.metrics[metric], bv = b.metrics[metric];
      if (av == null || bv == null) return av == null ? (bv == null ? a.model.localeCompare(b.model) : 1) : -1;
      return Math.abs(av - bv) > 1e-12 ? (av - bv) * DIRECTIONS[metric] : a.model.localeCompare(b.model);
    });
    let previous = null, lastRank = null;
    return ordered.map((record, i) => {
      const value = record.metrics[metric];
      if (value == null) return { ...record, rank: null };
      const same = previous !== null && Math.abs(value - previous) <= 1e-12;
      const position = same ? lastRank : i + 1;
      previous = value; lastRank = position;
      return { ...record, rank: position };
    });
  }
  function csv(records) {
    const settings = ["frozen", "finetuned", "scratch"];
    const metrics = ["kappa", "bac", "f1", "auc"];
    const header = ["dataset", "model", "PRR", "ACS", "PVS"];
    metrics.forEach(m => settings.forEach(s => header.push(`${m}_${s}`, `${m}_${s}_spread`)));
    const escape = value => {
      let s = value == null ? "" : String(value);
      if (/^[=+@\-\t\r]/.test(s) && typeof value === "string") s = "'" + s;
      return /[",\r\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
    };
    const rows = records.map(r => {
      const row = [r.dataset, r.model, r.metrics.prr, r.metrics.acs, r.metrics.pvs];
      metrics.forEach(m => settings.forEach(s => {
        const v = r.performance[m]?.[s]; row.push(v?.mean, v?.spread);
      }));
      return row.map(escape).join(",");
    });
    return "\ufeff" + [header.join(","), ...rows].join("\r\n");
  }
  return { DIRECTIONS, derive, rank, csv };
});
