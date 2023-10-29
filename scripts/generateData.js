// This script generates a JSON file from the content/ directory, for use in serverless endpoints.

import { readFile, readdir, writeFile, mkdir, stat } from 'fs/promises';
import matter from 'gray-matter';
import { join } from 'path';
import sizeOf from 'image-size';

/**
 * Read data inside the content/ folder.
 * @returns {Promise<object>}
 */
async function getData() {
  const contentDirectory = join(process.cwd(), 'content');
  const prefixes = ['doc', 'blog'];

  let allFiles = {};
  
  await Promise.all(prefixes.map(async (prefix) => {
    // Read all files, and get file data
    let files = await readdir(join(contentDirectory, prefix));
    files = files.filter((value) => value.endsWith('.md'));

    // Get page data
    const pages = await Promise.all(files.map(async (file) => {
      const content = await readFile(join(contentDirectory, prefix, file));
      
      // Parse metadata
      const matterResult = matter(content);

      // Compile array of images by reading content
      const imagePathRegex = /\/static\/work\/.+\.(png|jpg|jpeg|gif)/g;
      const images = [...matterResult.content.matchAll(imagePathRegex)].map((matchValue) => matchValue[0]);

      const imageSizes = await Promise.all(images.map(async (imagePath) => {
        const { width, height } = await sizeOf(join('public', imagePath));

        return {
          imagePath,
          width,
          height,
        };
      }));

      const coverImageDimensions = matterResult.data.coverImage ? {
        imagePath: matterResult.data.coverImage,
        ...sizeOf(join(contentDirectory, matterResult.data.coverImage)),
      } : null;

      return {
        id: file.substring(0, file.indexOf('.md')),
        prefix: prefix,
        content: matterResult.content,
        // Default all fields to `null`
        title: null,
        description: null,
        previewImage: null,
        imageAspectRatio: null,
        tags: null,
        allImages: imageSizes,
        wideImages: false, // false by default
        ...matterResult.data,
        coverImage: coverImageDimensions,
      }
    }));

    allFiles[prefix] = pages;
  }));

  return allFiles;
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

  await writeFile(join(process.cwd(), 'scripts', 'output', 'data.json'), JSON.stringify(data));
}

getData()
  .then((value) => {
    writeData(value);
  });