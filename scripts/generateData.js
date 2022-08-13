// This script generates a JSON file from the content/ directory, for use in serverless endpoints.

const { readFile, readdir, writeFile, mkdir } = require('fs/promises');
const matter = require('gray-matter');
const path = require('path');

/**
 * Read data inside the content/ folder.
 * @returns {Promise<object>}
 */
async function getData() {
  const contentDirectory = path.join(process.cwd(), 'content');
  const prefixes = ['work', 'doc', 'blog', 'about'];

  let allFiles = {};
  
  await Promise.all(prefixes.map(async (prefix) => {
    // Read all files, and get file data
    let files = await readdir(path.join(contentDirectory, prefix));
    files = files.filter((value) => value.endsWith('.md'));

    // Get page data
    const pages = await Promise.all(files.map(async (file) => {
      const content = await readFile(path.join(contentDirectory, prefix, file));
      
      // Parse metadata
      const matterResult = matter(content);
      return {
        id: file.substring(0, file.indexOf('.md')),
        prefix: prefix,
        content: matterResult.content,
        // Default all fields to `null`
        title: null,
        description: null,
        previewImage: null,
        coverImage: null,
        imageAspectRatio: null,
        tags: null,
        ...matterResult.data,
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
  const exists = (await readdir(path.join(process.cwd(), 'scripts'))).includes('output');
  if (!exists) {
    await mkdir(path.join(process.cwd(), 'scripts', 'output'));
  }

  await writeFile(path.join(process.cwd(), 'scripts', 'output', 'data.json'), JSON.stringify(data));
}

getData()
  .then((value) => {
    writeData(value);
  });