import { ShapeType } from "../types";
import { parsePoint } from "./shape/point";
import { parsePolyLine } from "./shape/poly-line";
import { parsePolygon } from "./shape/polygon";

enum RecordHeaderIndex {
  RecordNumber = 0,
  ContentLength = 4,
}

export function parseRecordHeader(data: ArrayBuffer, offset: number) {
  const view = new DataView(data, offset, 8);

  return {
    recordNumber: view.getInt32(RecordHeaderIndex.RecordNumber, false),
    contentLength: view.getInt32(RecordHeaderIndex.ContentLength, false),
  };
}

export function parseRecordContents(
  data: ArrayBuffer,
  startingPoint: number,
  contentLength: number
) {
  const view = new DataView(data, startingPoint, contentLength);
  const type: ShapeType = view.getInt32(0, true);

  switch (type) {
    case ShapeType.Point:
      return parsePoint(data, startingPoint)
    case ShapeType.PolyLine:
      return parsePolyLine(data, startingPoint, contentLength)
    case ShapeType.Polygon:
      return parsePolygon(data, startingPoint, contentLength);
    default:
      return {
        type,
      };
  }
}
