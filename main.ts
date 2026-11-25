// Laugh Track: The Crypto Trading Joke Contest — resubmitted entry.
// One line: swapping horoscopes for charts, and paying more for the
// privilege. Assembled from fragments, gate-checked, then written
// out as raw UTF-8 bytes so the file holds exactly the joke — no
// trailing newline, no extra whitespace, nothing else.
import * as fs from "node:fs";
import * as path from "node:path";

const MIN_LEN = 1;
const MAX_LEN = 200;
const FALLBACK_DIR = "/output";

function assembleEntry(): string {
  const fragments: string[] = [
    "I stopped reading horoscopes",
    " and started reading charts",
    " — same vague predictions,",
    " but the charts cost me a lot more money.",
  ];
  return fragments.join("");
}

function validateEntry(text: string): void {
  const points = Array.from(text);
  if (points.length < MIN_LEN || points.length > MAX_LEN) {
    throw new Error(
      `entry length ${points.length} is outside ${MIN_LEN}-${MAX_LEN}`,
    );
  }
  for (const ch of points) {
    if (ch === "\n" || ch === "\r" || ch === "\t") {
      throw new Error("entry must be a single line with no line breaks or tabs");
    }
    const code = ch.codePointAt(0) ?? 0;
    if (code < 0x20) {
      throw new Error("entry must not contain control characters");
    }
  }
  if (text !== text.trim() || text.trim().length === 0) {
    throw new Error("entry must not be blank or padded with whitespace");
  }
}

function main(): void {
  const entry = assembleEntry();
  validateEntry(entry);

  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? FALLBACK_DIR;
  fs.mkdirSync(dir, { recursive: true });
  const target = path.resolve(dir, "entry.txt");
  fs.writeFileSync(target, Buffer.from(entry, "utf8"));
  process.stdout.write(entry + "\n");
}

main();
