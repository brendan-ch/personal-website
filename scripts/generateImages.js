// This script generates a JSON file mapping all images in the `static` folder
// to plaiceholder data.

const path = require("path");

/**
 * Recursively generate image data from a folder and save it to a data object.
 * @param {string} folder The folder to read.
 * @param {object} dataObject Reference to the data object to write to.
 */
async function getImageDataFromFolder(folder, dataObject) {
  
}

/**
 * Read image data within the `/static` folder, and generate
 * plaiceholder data.
 */
async function getImageData() {
  const staticDirectory = path.join(process.cwd(), 'public', 'static');

  let dataObject = {};
  getImageDataFromFolder(staticDirectory, dataObject);

  return dataObject;
}

/**
 * Write output into a JSON file in the output/ directory.
 */
async function writeData(data) {
  // Check for output directory
  const exists = (await readdir(path.join(process.cwd(), 'scripts'))).includes('output');
  if (!exists) {
    await mkdir(path.join(process.cwd(), 'scripts', 'output'));
  }

  await writeFile(path.join(process.cwd(), 'scripts', 'output', 'imageData.json'), JSON.stringify(data));
}

getImageData()
  .then((value) => writeData(value));