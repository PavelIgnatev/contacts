import util from "util";
import fs from "fs";

const FSreadFile = util.promisify(fs.readFile);
const FSwriteFile = util.promisify(fs.writeFile);

const readFile = async (path: string): Promise<any> => {
  return await FSreadFile(path, "UTF-8");
};

const writeFile = async (path: string, text: string): Promise<any> => {
  return await FSwriteFile(path, text);
};

export { readFile, writeFile };
