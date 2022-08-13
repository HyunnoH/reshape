export class RecordHeader {
  recordNumber: number;

  contentLength: number;

  constructor(buffer: ArrayBuffer, private startingByte: number) {
    console.log(startingByte);
    const dataView = new DataView(buffer, startingByte);
    this.recordNumber = dataView.getInt32(0);
    this.contentLength = dataView.getInt32(4, false);
  }

  getNextHeaderPosition() {
    return this.startingByte + 8 + this.contentLength * 2;
  }
}
