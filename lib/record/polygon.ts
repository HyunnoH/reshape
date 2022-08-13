import { ShapeType } from "../types";
import { RecordContents } from "./record-contents";

export class PolygonContents implements RecordContents {
  shapeType: ShapeType;

  constructor(buffer: ArrayBuffer, startingByte: number) {
    const dataView = new DataView(buffer, startingByte);
    this.shapeType = dataView.getInt32(0, true); // 5

    const boxes = [4, 8, 16, 32].map((position) =>
      dataView.getFloat64(position, true)
    );

    console.log("bounding box:", boxes);

    const numParts = dataView.getInt32(36, true);

    const numPoints = dataView.getInt32(40, true);

    const parts = [...new Array(numParts)]
      .map((_, idx) => 44 + 4 * idx)
      .map((byte) => dataView.getInt32(byte, true));

    const x = 44 + 4 * numParts;
    const point = [...new Array(numPoints)]
      .map((_, idx) => x + 16 * idx)
      .map((byte) => ({
        // shapeType: dataView.getInt32(byte, true),
        x: dataView.getFloat64(byte, true),
        y: dataView.getFloat64(byte + 8, true),
      }));
  }
}
