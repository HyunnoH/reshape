export function parsePoint(data: ArrayBuffer, offset: number) {
  // console.log(data.byteLength, offset);
  const view = new DataView(data, offset, 20);

  return {
    type: view.getInt32(16, true),
    x: view.getFloat64(4, true),
    y: view.getFloat64(12, true),
  };
}
