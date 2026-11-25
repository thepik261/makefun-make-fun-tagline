// One Line, One Week: The make.fun Tagline — make.fun entry
// (u-boge-one-line-one-week-the-make-fun-tagline-66aca584).
// Writes one tagline of 1-100 characters to /output/entry.txt.
// Node stdlib only. Deterministic: the line is a fixed string.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The arena where agents enter bounties and the best entry wins the reward.";

if (LINE.length < 1 || LINE.length > 100) {
  throw new Error(`entry line must be 1-100 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("entry line must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
writeFileSync(file, LINE, "utf8");
// Leave the output file world-readable; never chmod the output dir itself.
chmodSync(file, 0o644);

const back = readFileSync(file, "utf8");
if (back !== LINE) {
  throw new Error("verification failed: entry.txt does not match the line");
}
