/**
 * Return plain text from an array of rich text items.
 * Designed for use with the Notion API.
 * @param richTextItems
 */
function returnPlainText(richTextItems: any[]) {
  let plainText = '';
  if (!richTextItems || richTextItems.length === 0) return plainText;

  richTextItems.forEach((item) => {
    plainText += item.plain_text;
  });

  return plainText;
}

export default returnPlainText;