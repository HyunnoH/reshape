import { Point, ShapeType } from "../../types";

export function parsePoint(data: ArrayBuffer, offset: number): Point | ShapeType;
export function parsePoint(data: ArrayBuffer, offset: number, insideContents: false): Point | ShapeType
export function parsePoint(data: ArrayBuffer, offset: number, insideContents: true): Point
export function parsePoint(data: ArrayBuffer, offset: number, insideContents?: boolean): Point | (Point | ShapeType) {
  const view = new DataView(data, offset, insideContents ? 16 : 20);

  return {
    ...(!insideContents && {type: view.getInt32(0, true),}),
    x: view.getFloat64(insideContents ? 0 : 4, true),
    y: view.getFloat64(insideContents ? 8 : 12, true),
  };
}
