export function buildBigram(corpus) {
  const chars = Array.from(new Set(("^" + corpus + "$").split("")));
  const idx = Object.fromEntries(chars.map((c, i) => [c, i]));
  const N = chars.length;
  const counts = Array.from({ length: N }, () => Array(N).fill(1)); // Laplace smoothing
  for (const raw of corpus.split(/\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const s = "^" + line.toLowerCase() + "$";
    for (let i = 0; i < s.length - 1; i++) {
      const a = idx[s[i]] ?? idx[" "];
      const b = idx[s[i + 1]] ?? idx[" "];
      counts[a][b] += 1;
    }
  }
  const probs = counts.map(row => {
    const sum = row.reduce((a, b) => a + b, 0);
    return row.map(v => v / sum);
  });
  return { chars, idx, probs };
}

function sampleRow(row, T = 0.7) {
  const scaled = row.map(p => Math.pow(p, 1 / T));
  const Z = scaled.reduce((a, b) => a + b, 0);
  let r = Math.random() * Z;
  for (let i = 0; i < scaled.length; i++) {
    r -= scaled[i];
    if (r <= 0) return i;
  }
  return row.length - 1;
}

export function generate(model, maxLen = 70, T = 0.7) {
  const { chars, idx, probs } = model;
  let out = "", cur = idx["^"];
  while (out.length < maxLen) {
    const next = sampleRow(probs[cur], T);
    const ch = chars[next];
    if (ch === "$") break;
    out += ch;
    cur = next;
  }
  out = out.trim();
  if (!/[!?]$/.test(out)) out += "!";
  return out.charAt(0).toUpperCase() + out.slice(1);
}
