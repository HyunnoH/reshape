import { readFileSync,  } from "fs";
import path from "path";
import readHeader from "../lib/header";
import { parseRecordContents, parseRecordHeader } from "../lib/record";
import { toArrayBuffer } from "../lib/utils/converter";

function* parseEachRow(start = 100, end = Infinity, data: ArrayBuffer) {
  let lastIndex = start;
  while (lastIndex < end) {
    const parsed = parseRecordHeader(data, lastIndex);
    lastIndex += 8;
    const contents = parseRecordContents(data, lastIndex, parsed.contentLength);
    lastIndex += parsed.contentLength * 2;
    yield { header: parsed, contents };
  }
}

const shp = readFileSync(path.join(__dirname, "..", "mock/MOCT_LINK.shp"));
const converted = toArrayBuffer(shp);

const parsedHeader = readHeader(converted);
// console.log(parsedHeader);

const generator = parseEachRow(100, converted.byteLength, converted);

let records = [];
while (true) {
  const result = generator.next();
  if (result.done) {
    break;
  }
  records.push(result.value);
}

console.log(records)

// console.log(records)


// writeFileSync(
//   path.join(__dirname, "..", "TL_SCCO_CTPRVN.json"),
//   JSON.stringify({ header: parsedHeader, records })
// );
