// @ts-check

// This script generates a JSON file mapping all images in the `static` folder
// to plaiceholder data.

import { readdir, stat, readFile, mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { getPlaiceholder } from "plaiceholder";

const plaiceholderConfig = {
  size: 16,
}

/**
 * Recursively generate image data from a folder and save it to a data object.
 * @param {string} folder The folder to read.
 * @param {object} dataObject Reference to the data object to write to.
 */
async function getImageDataFromFolder(folder, dataObject) {
  const files = await readdir(folder);
  await Promise.all(files.map(async (file) => {
    // For each file, get stats
    // If it's a directory, then recursively check files within that directory
    // If it's an image, then process it
    // If it's neither, ignore it

    const filepath = join(folder, file);

    const stats = await stat(filepath);
    if (stats.isDirectory()) {
      await getImageDataFromFolder(filepath, dataObject);
    } else if (file.endsWith('.png') || file.endsWith('.jpg')) {
      // Process the image
      const imageBuffer = await readFile(filepath);
      const placeholder = await getPlaiceholder(imageBuffer, plaiceholderConfig);

      // Write to object
      // Only write the path starting with "static"
      const startIndex = filepath.indexOf('/static');
      dataObject[filepath.substring(startIndex)] = placeholder;
    }
    // Otherwise do nothing
  }));
}

/**
 * Read image data within the `/static` folder, and generate
 * plaiceholder data.
 */
async function getImageData() {
  const staticDirectory = join(process.cwd(), 'public', 'static');

  let dataObject = {};
  await getImageDataFromFolder(staticDirectory, dataObject);

  return dataObject;
}

/**
 * Write output into a JSON file in the output/ directory.
 */
async function writeData(data) {
  // Check for output directory
  const exists = (await readdir(join(process.cwd(), 'scripts'))).includes('output');
  if (!exists) {
    await mkdir(join(process.cwd(), 'scripts', 'output'));
  }

  await writeFile(join(process.cwd(), 'scripts', 'output', 'imageData.json'), JSON.stringify(data));
}

getImageData()
  .then((value) => writeData(value));