import { ShapeType } from "../types";
import { parsePolygon } from "./shape/polygon";

enum RecordHeader {
  RecordNumber = 0,
  ContentLength = 4,
}

export function parseRecordHeader(data: ArrayBuffer, offset: number) {
  const view = new DataView(data, offset, 8);

  return {
    recordNumber: view.getInt32(RecordHeader.RecordNumber, false),
    contentLength: view.getInt32(RecordHeader.ContentLength, false),
  };
}

export function parseRecordContents(
  data: ArrayBuffer,
  startingPoint: number,
  contentLength: number
) {
  const view = new DataView(data, startingPoint, contentLength);
  const type = view.getInt32(0, true);

  return {
    type,
  };
}
