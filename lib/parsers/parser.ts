export interface Parser {
  readFromBuffer(buffer: Buffer): Promise<any>;
  readFromFile(path: string): Promise<any>;
  readFromStream(stream: NodeJS.ReadableStream): Promise<any>;
}
