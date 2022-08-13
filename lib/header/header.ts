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

export class Header {
  length: number;

  version: number;

  private xmin;
  private xmax;

  private ymin;
  private ymax;

  private zmin;
  private zmax;

  private mmin;
  private mmax;

  constructor(buf: ArrayBuffer) {
    const view = new DataView(buf, 0, 100);

    const fileCode = view.getInt32(HeaderPosition.FileCode, false);
    if (fileCode !== 9994) throw new Error();

    this.length = view.getInt32(HeaderPosition.FileLength, false);

    const version = view.getInt32(HeaderPosition.Version, true);
    if (version !== 1000) throw new Error();
    this.version = version;

    const shapeType: ShapeType = view.getInt32(HeaderPosition.ShapeType, true);

    this.xmin = view.getFloat64(HeaderPosition.BBoxXmin, true);
    this.ymin = view.getFloat64(HeaderPosition.BBoxYmin, true);
    this.xmax = view.getFloat64(HeaderPosition.BBoxXmax, true);
    this.ymax = view.getFloat64(HeaderPosition.BBoxYmax, true);

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

    this.zmin = zmin;
    this.zmax = zmax;
    this.mmin = mmin;
    this.mmax = mmax;
  }

  getFileInfo() {
    return {
      length: this.length,
      version: this.version,
      geometryRange: {
        x: {
          min: this.xmin,
          max: this.xmax,
        },
        y: {
          min: this.ymin,
          max: this.ymax,
        },
        z: {
          min: this.zmin,
          max: this.zmax,
        },
        m: {
          min: this.mmin,
          max: this.mmax,
        },
      },
    };
  }
}
