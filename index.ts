import { readFileSync } from "fs";
import path from "path";
import readHeader from "./lib/header";
import { parseRecordHeader } from "./lib/record";
import { toArrayBuffer } from "./lib/utils/converter";

function* f(start = 100, end = Infinity, data: ArrayBuffer) {
  let lastIndex = start;
  while (lastIndex < end) {
    const parsed = parseRecordHeader(data, lastIndex);
    lastIndex += parsed.contentLength * 2 + 8;
    yield parsed;
  }
}

const shp = readFileSync(path.join(__dirname, "mock/TL_SCCO_CTPRVN.shp"));

// Original Buffer
// Slice (copy) its segment of the underlying ArrayBuffer
const converted = toArrayBuffer(shp);

const parsedHeader = readHeader(converted);
const generator = f(100, converted.byteLength, converted);

let recordHeaders = [];
while (true) {
  const result = generator.next();
  if (result.done) {
    break;
  }
  recordHeaders.push(result.value);
}

console.log(parsedHeader, recordHeaders);
