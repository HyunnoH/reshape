import { ZType, MeasuredType, ShapeType } from "./../types/index";

export function isMeasuredOrZType(data: number): data is ZType | MeasuredType {
  return [
    ShapeType.PointZ,
    ShapeType.PolyLineZ,
    ShapeType.PolygonZ,
    ShapeType.MultiPointZ,
    ShapeType.PointM,
    ShapeType.PolyLineM,
    ShapeType.PolygonM,
    ShapeType.MultiPointM,
  ].includes(data);
}
