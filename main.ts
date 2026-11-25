// Laugh Track: The Crypto Trading Joke Contest — one line about
// crypto and trading life, under 200 characters. The program writes
// the joke to $MAKEFUN_OUTPUT_DIR/entry.txt (no trailing newline)
// and prints it to stdout.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I bought the dip, the dip dipped harder, so I sold the bottom — then watched it pump while my group chat renamed me 'Exit Liquidity'.";

const jokeLength = [...JOKE].length;
if (jokeLength < 1 || jokeLength > 200) {
  throw new Error(`Entry is ${jokeLength} characters, outside the 1-200 gate.`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
console.log(JOKE);
