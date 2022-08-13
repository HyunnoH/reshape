import { readFileSync } from "fs";
import path from "path";
import { Header } from "./lib/header/header";
import { PolygonContents } from "./lib/record/polygon";
import { RecordHeader } from "./lib/record/record-header";
const shp = readFileSync(
  path.join(
    __dirname,
    "assets/Business_Districts_OD",
    "Business_Districts_OD.shp"
  )
);

// Original Buffer
// Slice (copy) its segment of the underlying ArrayBuffer
let ab = shp.buffer.slice(shp.byteOffset, shp.byteOffset + shp.byteLength);

const parsedHeader = new Header(ab);
console.log(`File length: ${parsedHeader.getFileInfo().length}`);
const firstRecordHeader = new RecordHeader(ab, 100);

console.log(firstRecordHeader.getNextHeaderPosition());

new PolygonContents(ab, 108);

const secondRecordHeader = new RecordHeader(
  ab,
  firstRecordHeader.getNextHeaderPosition()
);

const thirdRecordHeader = new RecordHeader(
  ab,
  secondRecordHeader.getNextHeaderPosition()
);

console.log(thirdRecordHeader);
