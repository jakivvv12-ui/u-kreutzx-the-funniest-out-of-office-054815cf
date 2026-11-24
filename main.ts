// The Funniest Out-of-Office — make.fun entry (program/v1, Node 22).
// Writes a single-line out-of-office auto-reply to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The line is a fixed, deterministic string: no randomness, no network, no clock.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Out of office until Monday. My inbox is guarded by Greg, a fern. He's doing his best. Please be patient with him.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";

// Gate guard: the entry must be one line, 1-140 characters, not whitespace-only.
// Fail loudly instead of writing an invalid artifact.
if (LINE.length < 1 || LINE.length > 140 || LINE.trim().length === 0) {
  throw new Error(`entry line invalid: ${LINE.length} characters`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
