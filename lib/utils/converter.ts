export const toArrayBuffer: (b: Buffer) => ArrayBuffer = (b: Buffer) =>
  b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
