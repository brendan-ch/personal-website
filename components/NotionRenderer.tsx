import Image from 'next/image';
import styles from '../styles/NotionRenderer.module.css';

interface Props {
  /**
   * Array of Notion blocks to render on the page.
   */
  blocks: any[],
}

/**
 * Return plain text from an array of rich text items.
 * @param richTextItems
 */
function returnPlainText(richTextItems: any[]) {
  let plainText = '';

  richTextItems.forEach((item) => {
    plainText += item.plain_text;
  });

  return plainText;
}

/**
 * Return a JSX element from a rich text item.
 * @param richTextItem
 * @param key
 * @returns
 */
function richTextRenderer(richTextItem: any, key: string | number) {
  let toReturn: any = richTextItem.text.content;

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

  if (richTextItem.text.link) {
    toReturn = <a key={key} href={richTextItem.text.link.url} target="_blank" rel="noreferrer">{toReturn}</a>;
  }

  return toReturn;
}

/**
 * Object containing callbacks to return JSX elements
 * based on block type.
 * @todo Prevent cumulative layout shift with video element
 */
const Renderers = {
  paragraph: (block: any, key: string | number) => (
    // Nest rich text items inside paragraph
    <p key={key}>
      {block.rich_text.map(richTextRenderer)}
    </p>
  ),
  heading_1: (block: any, key: string | number) => (
    // Nest rich text items inside heading
    <h1 key={key}>
      {block.rich_text.map(richTextRenderer)}
    </h1>
  ),
  heading_2: (block: any, key: string | number) => (
    // Nest rich text items inside heading
    <h2 key={key}>
      {block.rich_text.map(richTextRenderer)}
    </h2>
  ),
  heading_3: (block: any, key: string | number) => (
    // Nest rich text items inside heading
    <h3 key={key}>
      {block.rich_text.map(richTextRenderer)}
    </h3>
  ),
  bulleted_list_item: (block: any, key: string | number, children?: any[]) => {
    return (
      <div key={key}>
        <li>
          {block.rich_text.map(richTextRenderer)}
        </li>
        {/* Indent */}
        <div className={styles.bulletedListIndentContainer}>
          {children
            ? children.map((child: any, i: number) => 
              // @ts-ignore
              Renderers[child.type] ? Renderers[child.type](child[child.type], i, child.children) : undefined
            )
            : undefined
          }
        </div>
      </div>
    )
  },
  toggle: (block: any, key: string | number, children?: any) => {
    return (
      <div key={key}>
        <li>
          {block.rich_text.map(richTextRenderer)}
        </li>
        {/* Indent */}
        <div className={styles.bulletedListIndentContainer}>
          {children
            ? children.map((child: any, i: number) => 
              // @ts-ignore
              Renderers[child.type] ? Renderers[child.type](child[child.type], i, child.children) : undefined
            )
            : undefined
          }
        </div>
      </div>
    )
  },
  numbered_list_item: (block: any, key: string | number, children?: any) => {
    return (
      <div key={key}>
        <p>
          {block.rich_text.map(richTextRenderer)}
        </p>
      </div>
    )
  },
  image: (block: any, key: string | number) => {
    return (
      <div
        className={styles.imageContainer}
        key={key}
      >
        <Image
          alt={returnPlainText(block.caption)}
          src={block.type === 'file' ? block.file.url : block.external.url}
          layout="fill"
          objectFit="contain"
        />
      </div>
    );
  },
  video: (block: any, key: string | number) => (
    // <div className={styles.videoContainer}>
    <video controls>
      <source src={block.type === 'file' ? block.file.url : block.external.url} />
      This browser does not support the video tag.
    </video>
  ),
};

/**
 * @todo Fix hydration error so JavaScript isn't needed
 */
export default function NotionRenderer({ blocks }: Props) {
  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
      {blocks.map((block, index) => Renderers[block.type] ? Renderers[block.type](block[block.type], index, block.children) : undefined)}
      <div className={styles.spacer}></div>
    </div>
  );
}