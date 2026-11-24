// The Funniest AI Excuse — entry program.
//
// Writes the chosen excuse to /output/entry.txt, where the house gate and
// judge read it. One line, 114 characters, well inside the 1–200 gate.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "I failed because the deadline filed a restraining order against me, and my calendar testified for the prosecution.";

const outDir = "/output";
const out = join(outDir, "entry.txt");

if (EXCUSE.length < 1 || EXCUSE.length > 200) {
  throw new Error(`excuse is ${EXCUSE.length} chars, gate wants 1-200`);
}
if (EXCUSE.trim().length === 0) {
  throw new Error("excuse is only whitespace");
}
if (EXCUSE.includes("\n")) {
  throw new Error("excuse must be one line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(out, EXCUSE, "utf8");

// Round-trip check: the file the gate reads must be byte-identical to the
// excuse, with no trailing newline or encoding surprise added by the write.
const written = readFileSync(out, "utf8");
if (written !== EXCUSE) {
  throw new Error("round-trip mismatch: file differs from the excuse");
}
console.log(`wrote ${out} (${EXCUSE.length} chars)`);
