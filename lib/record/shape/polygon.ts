import { Polygon, RecordContent } from "../../types";
import { parsePoint } from "./point";

export function parsePolygon(
  data: ArrayBuffer,
  offset: number,
  length: number
): Polygon | RecordContent {
  const view = new DataView(data, offset, length);
  const numParts = view.getInt32(36, true);
  const numPoints = view.getInt32(40, true);

  const partsIndex = [];
  for (let i = 0; i < numParts; i += 1) {
    partsIndex.push(44 + 4 * i);
  }

  const parts = partsIndex.map((part) => view.getInt32(part, true));

  const pointsIndex = [];
  for (let i = 0; i < numPoints; i += 1) {
    pointsIndex.push(offset + 44 + 4 * numParts + i * 16);
  }

  const points = pointsIndex.map((point) => parsePoint(data, point, true));

  return {
    type: view.getInt32(0, true),
    box: [
      view.getFloat64(4, true),
      view.getFloat64(12, true),
      view.getFloat64(20, true),
      view.getFloat64(28, true),
    ],
    numParts,
    numPoints,
    parts,
    points,
  };
}
