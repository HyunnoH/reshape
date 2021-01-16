import { isMeasuredOrZType } from "../utils/validate";
import { ShapeType } from "./../types";

enum HeaderPosition {
  FileCode = 0,
  FileLength = 24,
  Version = 28,
  ShapeType = 32,
  BBoxXmin = 36,
  BBoxYmin = 44,
  BBoxXmax = 52,
  BBoxYmax = 60,
  BBoxZmin = 68,
  BBoxZmax = 76,
  BBoxMmin = 84,
  BBoxMmax = 92,
}

export default function readHeader(buffer: ArrayBuffer) {
  const view = new DataView(buffer, 0, 100);

  const fileCode = view.getInt32(HeaderPosition.FileCode, false);
  if (fileCode !== 9994) throw new Error();

  const fileLength = view.getInt32(HeaderPosition.FileLength, false);

  const version = view.getInt32(HeaderPosition.Version, true);
  if (version !== 1000) throw new Error();

  const shapeType: ShapeType = view.getInt32(HeaderPosition.ShapeType, true);

  const xmin = view.getFloat64(HeaderPosition.BBoxXmin, true);
  const ymin = view.getFloat64(HeaderPosition.BBoxYmin, true);
  const xmax = view.getFloat64(HeaderPosition.BBoxXmax, true);
  const ymax = view.getFloat64(HeaderPosition.BBoxYmax, true);

  const zmin = view.getFloat64(HeaderPosition.BBoxZmin, true);
  const zmax = view.getFloat64(HeaderPosition.BBoxZmax, true);
  const mmin = view.getFloat64(HeaderPosition.BBoxMmin, true);
  const mmax = view.getFloat64(HeaderPosition.BBoxMmax, true);

  if (
    !isMeasuredOrZType(shapeType) &&
    (zmin !== 0.0 || zmax !== 0.0 || mmin !== 0.0 || mmax !== 0.0)
  ) {
    throw new Error();
  }

  return {
    fileCode,
    fileLength,
    version,
    shapeType,
    xmin,
    ymin,
    xmax,
    ymax,
    zmin,
    zmax,
    mmin,
    mmax,
  };
}
