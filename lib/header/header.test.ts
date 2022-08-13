import { Header } from "./header";
import { readFileSync } from "fs";
import path from "path";

describe("Header.ts", () => {
  it("헤더 정보를 정상적으로 출력한다", () => {
    const sampleBuffer = readFileSync(
      path.join(
        __dirname,
        "../../",
        "assets/Business_Districts_OD",
        "Business_Districts_OD.shp"
      )
    );

    const header = new Header(sampleBuffer.buffer);

    console.log(header.getFileInfo());
    expect(header.getFileInfo().version).toBe(1000);
  });
});
