(function () {
  "use strict";
  const data = window.ATLAS_DATA;
  const core = window.AtlasCore;
  if (!data || !core) {
    document.getElementById("main").innerHTML = '<div class="error-message"><h1>Results could not be loaded.</h1><p>Check that data/results.js and core.js are included in the deployment.</p></div>';
    return;
  }
  const config = window.ATLAS_CONFIG || {};
  const catalog = new Map((window.ATLAS_MODELS || []).map(m => [m.id, m]));
  const byId = id => document.getElementById(id);
  const escape = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = (value, decimals = 4) => Number.isFinite(value) ? value.toFixed(decimals) : "n.a.";
  const settings = ["frozen", "finetuned", "scratch"];
  const settingNames = { frozen: "Frozen", finetuned: "Fine-tuned", scratch: "Scratch" };
  const settingColors = { frozen: "#517fbd", finetuned: "#17634f", scratch: "#a2adb2" };
  const metricNames = { pvs: "Pretraining Value Score", prr: "Pretrained Representation Readiness", acs: "Architecture Contribution Score" };
  const performanceNames = { kappa: "Cohen’s κ", bac: "Balanced accuracy", f1: "Weighted F1", auc: "ROC AUC" };
  const url = new URL(location.href);
  const state = {
    dataset: data.datasets.some(d => d.id === url.searchParams.get("dataset")) ? url.searchParams.get("dataset") : data.datasets[0].id,
    metric: ["pvs", "prr", "acs"].includes(url.searchParams.get("metric")) ? url.searchParams.get("metric") : "pvs",
    matrix: "pvs", model: data.modelOrder[0], performance: "kappa", search: "", spread: false,
    sort: "pvs", sortDirection: -1,
  };
  const recordsFor = dataset => data.records.filter(r => r.dataset === dataset);
  const currentRecords = () => recordsFor(state.dataset);
  function meta(id) {
    return catalog.get(id) || { id, initials: id.slice(0, 2).toUpperCase(), color: "#6a8d78", family: "Architecture not yet documented", tags: [], description: "Model metadata will be added with its contribution.", feature: "", architecture: [], year: "", venue: "", paper: null, code: null };
  }
  function remember() {
    const next = new URL(location.href);
    next.searchParams.set("dataset", state.dataset);
    next.searchParams.set("metric", state.metric);
    try { history.replaceState(null, "", next); } catch { /* file:// preview can restrict history */ }
  }
  function announce(message) { byId("announcement").textContent = message; }
  function pressed(container, attr, selected) {
    container.querySelectorAll(`button[${attr}]`).forEach(b => b.setAttribute("aria-pressed", String(b.getAttribute(attr) === selected)));
  }
  function recordFor(model = state.model) { return currentRecords().find(r => r.model === model); }
  function colorFor(value) {
    if (!Number.isFinite(value) || value <= 0) return "#b4beb5";
    const t = Math.min(1, Math.max(0, value / .7));
    const a = [166, 194, 153], b = [21, 98, 77];
    return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
  }
  function setDataset(id) {
    if (!data.datasets.some(d => d.id === id)) return;
    state.dataset = id;
    state.model = core.rank(currentRecords(), "pvs")[0].model;
    renderDataset();
    remember();
    announce(`${id} selected. All dataset-specific charts and the results table have been updated.`);
  }
  function selectModel(model, scroll = false) {
    if (!recordFor(model)) return;
    state.model = model;
    renderScatter(); renderInspector(); renderResults();
    if (scroll) byId("explore").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
    announce(`${model} selected on ${state.dataset}.`);
  }
  function reducedMotion() { return matchMedia("(prefers-reduced-motion: reduce)").matches; }

  function renderRanking() {
    pressed(byId("metric-tabs"), "data-metric", state.metric);
    byId("ranking-title").textContent = metricNames[state.metric];
    byId("ranking-direction").textContent = state.metric === "acs" ? "Lower is better" : "Higher is better";
    byId("ranking-note").textContent = {
      pvs: "Joint readiness and relative pretraining gain. Ties share rank.",
      prr: "Relative readiness; PRR > 1 means frozen exceeds fine-tuned.",
      acs: "Raw ACS values; shorter bars indicate lower relative scratch performance.",
    }[state.metric];
    const ranked = core.rank(currentRecords(), state.metric);
    const max = Math.max(...ranked.map(r => Math.abs(r.metrics[state.metric] ?? 0)), .01);
    byId("rank-list").innerHTML = ranked.map(r => {
      const val = r.metrics[state.metric];
      return `<button class="rank-row" data-model="${escape(r.model)}" aria-label="${escape(r.model)}, rank ${r.rank ?? "unavailable"}, ${state.metric.toUpperCase()} ${fmt(val)}. Inspect model."><span class="rank-position">${r.rank == null ? "—" : String(r.rank).padStart(2, "0")}</span><span class="model-name">${escape(r.model)}</span><span class="rank-track" aria-hidden="true"><span class="rank-fill${val === 0 ? " zero" : ""}" style="width:${val == null ? 0 : Math.max(0, val) / max * 100}%"></span></span><span class="rank-value">${fmt(val)}</span></button>`;
    }).join("");
  }

  function renderScatter() {
    const records = currentRecords();
    const W = 660, H = 363, L = 58, R = 25, T = 26, B = 49;
    const maxX = Math.max(1.4, Math.ceil(Math.max(...records.map(r => r.metrics.prr ?? 0)) * 5) / 5);
    const maxY = Math.max(1.3, Math.ceil(Math.max(...records.map(r => r.metrics.acs ?? 0)) * 5) / 5);
    const minX = Math.min(0, Math.floor(Math.min(...records.map(r => r.metrics.prr ?? 0)) * 5) / 5);
    const minY = Math.min(0, Math.floor(Math.min(...records.map(r => r.metrics.acs ?? 0)) * 5) / 5);
    const x = v => L + (v - minX) / (maxX - minX) * (W - L - R);
    const y = v => H - B - (v - minY) / (maxY - minY) * (H - T - B);
    const ticksX = [minX, .4, .8, 1.2].filter((v, i, all) => v >= minX && v <= maxX && all.indexOf(v) === i);
    const ticksY = [minY, .4, .8, 1.2].filter((v, i, all) => v >= minY && v <= maxY && all.indexOf(v) === i);
    // Layout labels independently, resolving collisions without moving data points.
    const labelWidth = name => name.length * 6.25 + 7;
    const placed = [];
    const points = records.filter(r => Number.isFinite(r.metrics.prr) && Number.isFinite(r.metrics.acs)).sort((a, b) => a.metrics.acs - b.metrics.acs);
    const labels = points.map(r => {
      const px = x(r.metrics.prr), py = y(r.metrics.acs), width = labelWidth(r.model);
      const candidates = [[12, -8], [12, 17], [-width - 12, -8], [-width - 12, 18], [10, -27], [10, 35], [-width / 2, -37], [-width / 2, 46]];
      let best, bestPenalty = Infinity;
      for (const [dx, dy] of candidates) {
        const lx = Math.min(W - R - width, Math.max(L + 3, px + dx));
        const ly = Math.min(H - B - 5, Math.max(T + 14, py + dy));
        const box = { x: lx, y: ly - 11, w: width, h: 15 };
        let penalty = placed.some(p => box.x < p.x + p.w + 3 && box.x + box.w + 3 > p.x && box.y < p.y + p.h + 3 && box.y + box.h + 3 > p.y) ? 100 : 0;
        penalty += records.filter(o => o !== r && x(o.metrics.prr) > box.x - 10 && x(o.metrics.prr) < box.x + width + 10 && y(o.metrics.acs) > box.y - 8 && y(o.metrics.acs) < box.y + box.h + 8).length * 30;
        penalty += Math.hypot(dx, dy) / 100;
        if (penalty < bestPenalty) { bestPenalty = penalty; best = { box, lx, ly, px, py, r }; }
      }
      placed.push(best.box);
      return best;
    });
    const selected = recordFor();
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="group" aria-labelledby="scatter-title scatter-desc"><title id="scatter-title">Representation readiness and architecture contribution on ${escape(state.dataset)}</title><desc id="scatter-desc">PRR on the horizontal axis, ACS on the vertical axis. Lower ACS indicates a greater relative fine-tuning gain over scratch. Each point is a model; its color indicates PVS.</desc>`;
    svg += `<rect x="${L}" y="${T}" width="${W - L - R}" height="${H - T - B}" fill="#fcfdf9"/><rect x="${L}" y="${T}" width="${W - L - R}" height="${y(1) - T}" fill="#f9f2eb"/><text x="${L + 11}" y="${T + 17}" font-size="9" fill="#a58a73">ACS ≥ 1 · No positive fine-tuning gain over scratch</text>`;
    ticksX.forEach(v => { svg += `<line x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - B}" class="svg-grid"/><text x="${x(v)}" y="${H - B + 21}" text-anchor="middle" font-size="10" class="svg-tick">${v.toFixed(1)}</text>`; });
    ticksY.forEach(v => { svg += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" class="svg-grid"/><text x="${L - 12}" y="${y(v) + 3}" text-anchor="end" font-size="10" class="svg-tick">${v.toFixed(1)}</text>`; });
    svg += `<line x1="${L}" x2="${W - R}" y1="${y(1)}" y2="${y(1)}" stroke="#b4aa9a" stroke-dasharray="5 5"/><line x1="${x(1)}" x2="${x(1)}" y1="${T}" y2="${H - B}" stroke="#b2c4b0" stroke-dasharray="5 5"/><text x="${x(1) + 6}" y="${H - B - 9}" font-size="9" fill="#92a08c">PRR = 1</text>`;
    if (selected) svg += `<circle cx="${x(selected.metrics.prr)}" cy="${y(selected.metrics.acs)}" r="13" fill="none" stroke="#17634f" stroke-opacity=".25" stroke-width="2"/>`;
    labels.forEach(({ px, py, lx, ly, r }) => {
      const text = `${r.model}: PRR ${fmt(r.metrics.prr)}, ACS ${fmt(r.metrics.acs)}, PVS ${fmt(r.metrics.pvs)}`;
      svg += `<g class="chart-point" role="button" tabindex="0" data-model="${escape(r.model)}" aria-label="${escape(text)}"><title>${escape(text)}</title><circle cx="${px}" cy="${py}" r="7" fill="${colorFor(r.metrics.pvs)}" stroke="#fff" stroke-width="2"/><text x="${lx}" y="${ly}" font-size="10.5" class="svg-model-label" style="paint-order:stroke;stroke:#fcfdf9;stroke-width:3px;stroke-linejoin:round">${escape(r.model)}</text></g>`;
    });
    svg += `<text x="${(L + W - R) / 2}" y="${H - 6}" text-anchor="middle" class="svg-axis-label" font-size="11">PRR →</text><text transform="translate(16 ${(T + H - B) / 2}) rotate(-90)" text-anchor="middle" class="svg-axis-label" font-size="11">ACS ↓</text></svg>`;
    byId("scatter-chart").innerHTML = svg;
  }

  function renderInspector() {
    const r = recordFor(); if (!r) return;
    const m = meta(r.model), k = r.performance.kappa;
    const readiness = r.metrics.prr >= 1 ? "Frozen performance exceeds fine-tuning." : `The frozen setting retains ${(r.metrics.prr * 100).toFixed(1)}% of the fine-tuned κ.`;
    const gain = r.metrics.acs >= 1 ? "Fine-tuning does not outperform scratch in the reported means." : `The relative fine-tuning gain over scratch is ${((1 - r.metrics.acs) * 100).toFixed(1)}%.`;
    byId("model-inspector").innerHTML = `<div class="inspector-top"><span class="model-monogram" style="color:${m.color}">${escape(m.initials)}</span><div class="eyebrow">SELECTED MODEL / ${escape(state.dataset)}</div></div><h3 class="inspector-model">${escape(r.model)}</h3><p class="inspector-family">${escape(m.family)}</p><dl class="inspector-metrics"><div><dt>PVS ↑</dt><dd>${fmt(r.metrics.pvs)}</dd></div><div><dt>PRR ↑</dt><dd>${fmt(r.metrics.prr)}</dd></div><div><dt>ACS ↓</dt><dd>${fmt(r.metrics.acs)}</dd></div></dl><div class="inspector-kappas">${settings.map(s => `<span>${settingNames[s]} κ<strong>${fmt(k[s]?.mean)}</strong></span>`).join("")}</div><p class="inspector-insight">${escape(readiness)} ${escape(gain)}</p><a class="text-link inspector-link" href="#model-${escape(r.model)}">About this architecture <span aria-hidden="true">↘</span></a>`;
  }

  function renderMatrix() {
    pressed(byId("matrix-tabs"), "data-matrix", state.matrix);
    const best = new Map(data.datasets.map(d => [d.id, core.rank(recordsFor(d.id), state.matrix)[0]?.metrics[state.matrix]]));
    const all = data.records.map(r => r.metrics[state.matrix]).filter(Number.isFinite);
    const max = Math.max(...all), min = Math.min(...all);
    let table = `<table class="matrix-table"><caption class="sr-only">${state.matrix.toUpperCase()} across four datasets; dots mark the best score within each dataset</caption><thead><tr><th scope="col">MODEL / ${state.matrix.toUpperCase()} ${state.matrix === "acs" ? "↓" : "↑"}</th>${data.datasets.map(d => `<th scope="col"><button data-dataset="${escape(d.id)}" aria-label="Select ${escape(d.label)}">${escape(d.label)}</button><small>${escape(d.task)}</small></th>`).join("")}</tr></thead><tbody>`;
    data.modelOrder.forEach(id => {
      const m = meta(id);
      table += `<tr><th scope="row"><button class="matrix-model" data-model="${escape(id)}"><span class="model-color" style="background:${m.color}"></span>${escape(id)}</button></th>`;
      data.datasets.forEach(d => {
        const r = data.records.find(v => v.dataset === d.id && v.model === id);
        const value = r?.metrics[state.matrix], isBest = Number.isFinite(value) && Math.abs(value - best.get(d.id)) < 1e-12;
        const shade = !Number.isFinite(value) ? 0 : state.matrix === "acs" ? (max - value) / (max - min || 1) : (value - min) / (max - min || 1);
        table += `<td><button class="matrix-value${isBest ? " best" : ""}" data-matrix-dataset="${escape(d.id)}" data-model="${escape(id)}" style="background:rgba(73,124,75,${(.025 + shade * .16).toFixed(3)})" aria-label="${escape(id)}, ${escape(d.id)}, ${state.matrix.toUpperCase()} ${fmt(value)}${isBest ? ", best in dataset" : ""}. Inspect result.">${isBest ? '<i class="best-marker" aria-hidden="true"></i>' : ""}${fmt(value)}</button></td>`;
      });
      table += "</tr>";
    });
    byId("matrix-table").innerHTML = table + "</tbody></table>";
    byId("matrix-note").textContent = state.matrix === "acs" ? "ACS ↓ · Stronger shading indicates a lower score." : `${state.matrix.toUpperCase()} ↑ · Stronger shading indicates a higher score.`;
  }

  function renderPerformance() {
    const available = ["kappa", "bac", currentRecords()[0].performance.auc ? "auc" : "f1"];
    if (!available.includes(state.performance)) state.performance = available[2];
    byId("performance-metric").innerHTML = available.map(p => `<option value="${p}"${state.performance === p ? " selected" : ""}>${escape(performanceNames[p])}</option>`).join("");
    const W = 1100, H = 331, L = 105, R = 38, T = 22, B = 37;
    const rows = currentRecords(), step = (H - T - B) / rows.length;
    const observations = rows.flatMap(r => settings.map(s => r.performance[state.performance]?.[s]?.mean)).filter(Number.isFinite);
    const lo = Math.min(0, ...observations), hi = Math.max(1, ...observations);
    const x = v => L + (v - lo) / (hi - lo) * (W - L - R);
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="performance-svg-title performance-svg-desc"><title id="performance-svg-title">${escape(performanceNames[state.performance])} on ${escape(state.dataset)}</title><desc id="performance-svg-desc">Each model has three markers: blue circle for Frozen, green square for Fine-tuned, and gray triangle for Scratch. Hover or focus for reported values.</desc>`;
    for (let i = 0; i <= 5; i++) {
      const v = lo + (hi - lo) * i / 5;
      svg += `<line class="svg-grid" x1="${x(v)}" x2="${x(v)}" y1="${T - 8}" y2="${H - B + 1}"/><text x="${x(v)}" y="${H - 14}" font-size="10" class="svg-tick" text-anchor="middle">${v.toFixed(1)}</text>`;
    }
    rows.forEach((r, i) => {
      const cy = T + step * (i + .5);
      svg += `<text x="${L - 17}" y="${cy + 4}" text-anchor="end" font-size="12" class="svg-model-label">${escape(r.model)}</text><line x1="${L}" x2="${W - R}" y1="${cy}" y2="${cy}" stroke="#f0f3ec"/>`;
      const values = settings.map(s => r.performance[state.performance]?.[s]?.mean).filter(Number.isFinite);
      if (values.length > 1) svg += `<line x1="${x(Math.min(...values))}" x2="${x(Math.max(...values))}" y1="${cy}" y2="${cy}" stroke="#c9d3c7" stroke-width="1.3"/>`;
      settings.forEach((s, j) => {
        const v = r.performance[state.performance]?.[s]; if (!v) return;
        const cx = x(v.mean), py = cy + (j - 1) * 6.5;
        const label = `${r.model}, ${settingNames[s]}, ${performanceNames[state.performance]}: ${fmt(v.mean)}${v.spread == null ? "" : ` ± ${fmt(v.spread)} (reported dispersion)`}`;
        const shape = s === "frozen" ? `<circle cx="${cx}" cy="${py}" r="4.6" fill="${settingColors[s]}" stroke="white" stroke-width="1.1"/>` : s === "finetuned" ? `<rect x="${cx - 4.1}" y="${py - 4.1}" width="8.2" height="8.2" fill="${settingColors[s]}" stroke="white" stroke-width="1"/>` : `<path d="M ${cx} ${py - 5} l 5 9 h -10 Z" fill="${settingColors[s]}" stroke="white" stroke-width="1"/>`;
        svg += `<g tabindex="0" role="img" aria-label="${escape(label)}"><title>${escape(label)}</title>${shape}</g>`;
      });
    });
    byId("performance-chart").innerHTML = svg + "</svg>";
  }

  function cellValue(r, key) {
    if (["pvs", "prr", "acs"].includes(key)) return r.metrics[key];
    return r.performance[state.performance]?.[key]?.mean;
  }
  function renderResults() {
    const headers = [["model", "Model"], ["prr", "PRR ↑"], ["acs", "ACS ↓"], ["pvs", "PVS ↑"], ...settings.map(s => [s, `${performanceNames[state.performance]} · ${settingNames[s]}`])];
    byId("results-head").innerHTML = "<tr>" + headers.map(([key, label]) => `<th scope="col"${state.sort === key ? ` aria-sort="${state.sortDirection === 1 ? "ascending" : "descending"}"` : ""}><button data-sort="${key}">${escape(label)}${state.sort === key ? (state.sortDirection === 1 ? " ▴" : " ▾") : ""}</button></th>`).join("") + "</tr>";
    const filtered = currentRecords().filter(r => r.model.toLowerCase().includes(state.search.toLowerCase()));
    filtered.sort((a, b) => {
      if (state.sort === "model") return state.sortDirection * a.model.localeCompare(b.model);
      const av = cellValue(a, state.sort), bv = cellValue(b, state.sort);
      if (av == null || bv == null) return av == null ? (bv == null ? 0 : 1) : -1;
      return Math.abs(av - bv) < 1e-12 ? a.model.localeCompare(b.model) : (av - bv) * state.sortDirection;
    });
    byId("results-body").innerHTML = filtered.length ? filtered.map(r => `<tr${r.model === state.model ? ' class="selected-model"' : ""}><th scope="row"><button class="table-model" data-model="${escape(r.model)}"><span class="model-color" style="background:${meta(r.model).color}"></span>${escape(r.model)}</button></th>${["prr", "acs", "pvs"].map(m => `<td class="metric-cell">${fmt(r.metrics[m])}</td>`).join("")}${settings.map(s => {
      const v = r.performance[state.performance]?.[s];
      return `<td>${fmt(v?.mean)}${state.spread && v?.spread != null ? ` <span class="muted-spread">± ${fmt(v.spread)}</span>` : ""}</td>`;
    }).join("")}</tr>`).join("") : '<tr><td colspan="7" class="empty-results">No matching models. Try another name.</td></tr>';
    byId("results-note").textContent = `${filtered.length} of ${currentRecords().length} models · ${state.dataset} · LOSO. Performance columns follow the metric selector above. ${state.spread ? "± values are preserved as reported; the source does not specify their dispersion definition. " : "Means shown. "}Downloads include all performance metrics and reported spreads.`;
  }

  function renderModels() {
    byId("model-grid").innerHTML = data.modelOrder.map(id => {
      const m = meta(id);
      return `<article class="model-card" id="model-${escape(id)}"><div class="model-card-top"><span class="model-monogram" style="color:${m.color}">${escape(m.initials)}</span><div><h3>${escape(id)}</h3><p class="model-venue">${escape(m.venue)}</p></div><span class="model-year">${escape(m.year)}</span></div><div class="model-tags">${m.tags.map(t => `<span class="model-tag">${escape(t)}</span>`).join("")}</div><p class="model-description">${escape(m.description)}</p><p class="model-feature">${escape(m.feature)}</p><div class="architecture-mini" aria-label="Architecture summary">${m.architecture.map((a, i) => `${i ? '<b aria-hidden="true">→</b>' : ""}<span>${escape(a)}</span>`).join("")}</div><div class="model-card-bottom">${m.paper ? `<a href="${escape(m.paper)}" target="_blank" rel="noopener noreferrer" aria-label="Read ${escape(id)} original paper">Paper ↗</a>` : ""}${m.code ? `<a href="${escape(m.code)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escape(id)} official code">Code ↗</a>` : ""}<button data-model="${escape(id)}" data-scroll="true">View results ↗</button></div></article>`;
    }).join("") + '<article class="model-card collection-note"><div class="eyebrow">AN EXTENSIBLE COLLECTION</div><h3>Another model.<br>A clearer comparison.</h3><p>Evaluate Frozen, Fine-tuned, and Scratch settings on the same architecture, then share your results with the community.</p><button class="text-link" data-external="submissionUrl">Contribute a model ↗</button></article>';
  }

  function renderDataset() {
    const ds = data.datasets.find(d => d.id === state.dataset);
    pressed(byId("dataset-tabs"), "data-dataset", state.dataset);
    byId("dataset-task").textContent = ds.task;
    document.querySelectorAll("[data-dataset-label]").forEach(e => { e.textContent = ds.label; });
    renderRanking(); renderScatter(); renderInspector(); renderPerformance(); renderResults();
  }
  function download(text, filename, mime = "text/csv;charset=utf-8") {
    const blobUrl = URL.createObjectURL(new Blob([text], { type: mime }));
    const a = document.createElement("a"); a.href = blobUrl; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    announce(`Downloaded ${filename}.`);
  }
  const dialog = byId("link-dialog");
  function external(key) {
    const value = config[key];
    let target;
    try { target = new URL(value); } catch { target = null; }
    if (target && ["https:", "http:"].includes(target.protocol)) {
      const a = document.createElement("a"); a.href = target.href; a.target = "_blank"; a.rel = "noopener noreferrer";
      document.body.appendChild(a); a.click(); a.remove(); return;
    }
    const labels = {
      repositoryUrl: ["The project repository is coming soon.", "The project’s GitHub repository has not been linked yet. You can explore the results and download the data directly from this page."],
      submissionUrl: ["Model submissions are coming soon.", "The GitHub submission guide and evaluation package will be linked here once they are available."],
      feedbackUrl: ["The feedback page is coming soon.", "A GitHub page for questions, corrections, and feedback will be linked here once it is available."],
      paperUrl: ["The paper link is coming soon.", "The research paper will be linked here when its public version is available. You can read the evaluation framework on this page."],
    };
    const [title, copy] = labels[key] || labels.repositoryUrl;
    byId("dialog-title").textContent = title; byId("dialog-copy").textContent = copy;
    dialog.showModal();
  }

  document.addEventListener("click", event => {
    const target = event.target.closest("button, [role=button]"); if (!target) return;
    if (target.dataset.matrixDataset) { setDataset(target.dataset.matrixDataset); selectModel(target.dataset.model, true); return; }
    if (target.dataset.dataset) { setDataset(target.dataset.dataset); return; }
    if (target.dataset.metric) { state.metric = target.dataset.metric; renderRanking(); remember(); announce(`Ranking by ${metricNames[state.metric]}.`); return; }
    if (target.dataset.matrix) { state.matrix = target.dataset.matrix; renderMatrix(); return; }
    if (target.dataset.model) { selectModel(target.dataset.model, target.dataset.scroll === "true" || Boolean(target.closest("#matrix-table, #rank-list"))); return; }
    if (target.dataset.sort) { const key = target.dataset.sort; state.sortDirection = state.sort === key ? -state.sortDirection : key === "acs" || key === "model" ? 1 : -1; state.sort = key; renderResults(); return; }
    if (target.dataset.external) external(target.dataset.external);
  });
  byId("scatter-chart").addEventListener("keydown", event => {
    const target = event.target.closest("[data-model]");
    if (target && ["Enter", " "].includes(event.key)) { event.preventDefault(); selectModel(target.dataset.model); }
  });
  byId("performance-metric").addEventListener("change", event => { state.performance = event.target.value; renderPerformance(); renderResults(); });
  byId("model-search").addEventListener("input", event => { state.search = event.target.value; renderResults(); });
  byId("show-spread").addEventListener("change", event => { state.spread = event.target.checked; renderResults(); });
  byId("download-current").addEventListener("click", () => download(core.csv(currentRecords()), `${state.dataset}-results.csv`));
  byId("download-ranking").addEventListener("click", () => {
    const rows = core.rank(currentRecords(), state.metric);
    const text = "\ufeffrank,dataset,model," + state.metric.toUpperCase() + "\r\n" + rows.map(r => `${r.rank ?? ""},${r.dataset},${r.model},${r.metrics[state.metric] ?? ""}`).join("\r\n");
    download(text, `${state.dataset}-${state.metric}-ranking.csv`);
  });
  dialog.querySelectorAll(".dialog-close,.dialog-done").forEach(b => b.addEventListener("click", () => dialog.close()));
  dialog.addEventListener("click", event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  byId("dataset-tabs").innerHTML = data.datasets.map(d => `<button data-dataset="${escape(d.id)}" aria-pressed="false">${escape(d.label)}</button>`).join("");
  byId("source-details").innerHTML = `<p><strong>Data provenance.</strong> Imported ${escape(new Date(data.importedAt).toISOString().slice(0, 10))}. Both original workbooks are preserved. ${data.records.length * 3} proposed metric values were cross-checked against the reported κ means.</p><ul class="source-list">${data.sources.map(s => `<li>${escape(s.name)}<br><code>SHA-256: ${escape(s.sha256)}</code></li>`).join("")}</ul><p>Download the <a class="text-link" href="data/results.json" download>JSON data</a> for source worksheet and cell ranges, or the <a class="text-link" href="data/results.csv" download>complete CSV</a> for numerical reuse. Model descriptions link to their original papers and official code; they summarize the published method rather than identifying the evaluated checkpoint.</p>`;
  state.model = core.rank(currentRecords(), "pvs")[0].model;
  renderDataset(); renderMatrix(); renderModels();
})();
