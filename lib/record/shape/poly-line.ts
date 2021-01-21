import { PolyLine, RecordContent } from "../../types";
import { parsePoint } from "./point";

export function parsePolyLine(data: ArrayBuffer, offset: number, contentLength: number): PolyLine | RecordContent {
  const view = new DataView(data, offset, contentLength * 2);

  const numParts = view.getInt32(36, true)
  const numPoints = view.getInt32(40, true)

  const parts = [];
  for (let i = 0; i < numParts; i += 1) {
    parts.push(view.getInt32(44 + i * 4, true))
  }

  const points = [];
  for (let i = 0; i < numPoints; i += 1) {
    points.push(parsePoint(data, offset + 44 + 4 * numParts + i * 16, true))
  }

  return {
    type: view.getInt32(0, true),
    box: [
      view.getFloat64(4, true),
      view.getFloat64(12, true),
      view.getFloat64(20, true),
      view.getFloat64(28, true)
    ],
    numParts,
    numPoints,
    parts,
    points
  }
}
