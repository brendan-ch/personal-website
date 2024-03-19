/**
 * Given a local image path, return the placeholder data.
 * @param path
 * @returns
 */
export default function generatePlaceholder(path: string) {
  const parsed = require('../../scripts/output/imageData.json');
  return parsed[path];
}
