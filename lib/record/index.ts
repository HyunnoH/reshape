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
