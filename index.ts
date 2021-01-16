import { readFileSync } from "fs";
import path from "path";
import readHeader from "./lib/header";
import { parseRecordHeader } from "./lib/record";
const shp = readFileSync(path.join(__dirname, "mock/klh_dstrc_bndry.shp"));

// Original Buffer
// Slice (copy) its segment of the underlying ArrayBuffer
let ab = shp.buffer.slice(shp.byteOffset, shp.byteOffset + shp.byteLength);

const parsedHeader = readHeader(ab);
const firstRecordHeader = parseRecordHeader(ab, 100);

console.log(parsedHeader, firstRecordHeader);
