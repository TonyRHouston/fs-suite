import fs from 'fs';
import path from "path";

export const getFiles = function (dirPath, arrayOfFiles) {
  if (!fs.existsSync(dirPath))
    return -1;
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })
  return arrayOfFiles
}

export const search = (_input, _root) => {
  const files = getFiles(_root);
  if (files == -1)
    return undefined;
  for (let x = 0; x < files.length; x++)
    if (files[x].includes(_input))
      return files[x];

  return undefined;

}

export const read = (path) => {
  const readData = fs.readFileSync(path, { encoding: 'utf8' });
  return readData;
}

export const write = (dir, content) => {
  recursive(path.dirname(dir))

  fs.writeFileSync(dir, content);
}

export const parse = (path) => {
  return JSON.parse(read(path));
}

function recursive(start) {
  let dir = path.dirname(start);
  if (!fs.existsSync(dir))
    recursive(dir)

  if (!fs.existsSync(start))
    fs.mkdirSync(start);
}

export const _version = "1.0.4";

export default _version;
