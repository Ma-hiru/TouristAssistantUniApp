//@ts-ignore
import fs from "fs";
//@ts-ignore
import path from "path";

await (async function handleSvg(dirPath: fs.PathLike, color: string) {
  dirPath = path.resolve(dirPath);
  console.log("DirPath=>", dirPath);
  const entries = await fs.promises.readdir(dirPath, {
    withFileTypes: true,
  });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    console.log("Is handling=>", entry.name);
    const sourceFile = await fs.promises.readFile(fullPath, "utf-8");
    if (/fill=".*?"/.test(sourceFile)) {
      const newSourceFile = sourceFile.replace(
        /fill=".*?"/g,
        `fill="${color}"`
      );
      await fs.promises.writeFile(fullPath, newSourceFile, "utf-8");
    } else {
      const newSourceFile = sourceFile.replace(
        /<svg /g,
        `<svg fill="${color}"`
      );
      await fs.promises.writeFile(fullPath, newSourceFile, "utf-8");
    }
  }
  console.log("Done!");
})("./weather", "#000000");
