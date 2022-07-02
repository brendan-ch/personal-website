/**
 * Return a JSX element from a rich text item.
 * @param richTextItem
 * @param key
 * @returns
 */
function richTextRenderer(richTextItem: any, key: string | number) {
  // Deal with mentions
  if (richTextItem.type !== 'text') {
    return richTextItem.plain_text;
  }
  
  // Assume at this point that it's of type text
  let toReturn: any = richTextItem.text.content;

  if (richTextItem.text.link) {
    toReturn = <a key={key} href={richTextItem.text.link.url} target="_blank" rel="noreferrer">{toReturn}</a>;
  }
  if (!richTextItem.annotations) return toReturn;

  if (richTextItem.annotations.bold) {
    toReturn = <b key={key}>{toReturn}</b>;
  }

  if (richTextItem.annotations.underline) {
    toReturn = <u key={key}>{toReturn}</u>;
  }

  if (richTextItem.annotations.italic) {
    toReturn = <i key={key}>{toReturn}</i>;
  }

  if (richTextItem.annotations.strikethrough) {
    toReturn = <s key={key}>{toReturn}</s>;
  }

  return toReturn;
}

export default richTextRenderer;