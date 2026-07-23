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
  assert.doesNotMatch(publicSource, /google\.script\.run/);
});

test("declares installable branded assets", async () => {
  const manifest = JSON.parse(await readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"));
  assert.equal(manifest.name, "Gerador de Etiquetas INOVALAB");
  assert.equal(manifest.icons.length, 2);
  await readFile(new URL("../public/etiquetas-icon-512.png", import.meta.url));
  await readFile(new URL("../public/favicon.png", import.meta.url));
});
