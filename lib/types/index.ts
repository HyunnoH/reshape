export enum ShapeType {
  Null,
  Point,
  PolyLine = 3,
  Polygon = 5,
  MultiPoint = 8,
  PointZ = 11,
  PolyLineZ = 13,
  PolygonZ = 15,
  MultiPointZ = 18,
  PointM = 21,
  PolyLineM = 23,
  PolygonM = 25,
  MultiPointM = 28,
  MultiPatch = 31,
}

export type ZType =
  | ShapeType.PointZ
  | ShapeType.PolyLineZ
  | ShapeType.PolygonZ
  | ShapeType.MultiPointZ;

export type MeasuredType =
  | ShapeType.PointM
  | ShapeType.PolyLineM
  | ShapeType.PolygonM
  | ShapeType.MultiPointM;
