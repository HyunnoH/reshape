export class IndexRecord {
  offset: number;

  contentLength: number;

  constructor(buffer: ArrayBuffer, startingByte: number) {
    const dataView = new DataView(buffer, startingByte, 8);
    this.offset = dataView.getInt32(0, false);
    this.contentLength = dataView.getInt32(4, false);
  }
}
