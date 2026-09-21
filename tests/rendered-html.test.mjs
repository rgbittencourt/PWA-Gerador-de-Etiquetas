import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("preserves the original label generator", async () => {
  const source = await readFile(new URL("../google-apps-script/Index.html", import.meta.url), "utf8");
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /Gerador de Etiquetas/);
  assert.match(source, /logo-ifsc|IFSC/);
  assert.match(source, /logo-inovalab|INOVALAB/);
  assert.match(page, /\/etiquetas\.html/);
  const publicSource = await readFile(new URL("../public/etiquetas.html", import.meta.url), "utf8");
  assert.match(publicSource, /\/api\/etiquetas/);
  assert.match(publicSource, /id="filtroLocal"/);
  assert.match(publicSource, /item\.local !== local/);
  assert.doesNotMatch(publicSource, /google\.script\.run/);
});

test("keeps the location filter in the Google Apps Script version", async () => {
  const source = await readFile(new URL("../google-apps-script/Index.html", import.meta.url), "utf8");
  assert.match(source, /id="filtroLocal"/);
  assert.match(source, /item\.local !== local/);
});

test("declares installable branded assets", async () => {
  const manifest = JSON.parse(await readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"));
  assert.equal(manifest.name, "Gerador de Etiquetas INOVALAB");
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.icons.length, 2);
  await readFile(new URL("../public/etiquetas-icon-512.png", import.meta.url));
  await readFile(new URL("../public/favicon.png", import.meta.url));
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const registration = await readFile(new URL("../public/pwa-register.js", import.meta.url), "utf8");
  const serviceWorker = await readFile(new URL("../public/sw.js", import.meta.url), "utf8");
  assert.match(layout, /pwa-register\.js/);
  assert.match(layout, /gerador-etiquetas-inovalab\.rogerio-bittencourt-1a9\.workers\.dev/);
  assert.match(registration, /serviceWorker\.register\('\/sw\.js'\)/);
  assert.match(serviceWorker, /url\.pathname\.startsWith\('\/api\/'\)/);
});

test("includes the Pimaco 6089 60-label Letter layout", async () => {
  const source = await readFile(new URL("../public/etiquetas.html", import.meta.url), "utf8");
  assert.match(source, /Pimaco 6089 — 16,93×44,45mm — 60\/folha \(4×15\)/);
  assert.match(
    source,
    /'6089': \{ altura:16\.93, largura:44\.45, cols:4, rows:15, margemTop:12\.5, margemLeft:14\.5, pitchV:16\.93, pitchH:47\.45, raio:1\.5 \}/,
  );
  assert.match(source, /\.etiqueta\.modelo-6089/);
});
