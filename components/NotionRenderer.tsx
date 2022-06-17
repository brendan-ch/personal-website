import { useEffect, useState } from 'react';
import styles from '../styles/NotionRenderer.module.css';

interface Props {
  /**
   * Array of Notion blocks to render on the page.
   */
  blocks: any[],
}

/**
 * Object containing callbacks to return JSX elements
 * based on block type.
 */
const Renderers = {
  paragraph: (block: any, key: string | number) => (
    // Nest rich text items inside paragraph
    <p key={key}>
      {block.rich_text.map((richTextItem: any, index: number) => {
        let toReturn: any = richTextItem.text.content;

        if (richTextItem.annotations.bold) {
          toReturn = <b>{toReturn}</b>;
        }

        if (richTextItem.annotations.underline) {
          toReturn = <u>{toReturn}</u>;
        }

        if (richTextItem.annotations.italic) {
          toReturn = <i>{toReturn}</i>;
        }

        if (richTextItem.annotations.strikethrough) {
          toReturn = <s>{toReturn}</s>;
        }

        if (richTextItem.text.link) {
          toReturn = <a href={richTextItem.text.link.url} target="_blank" rel="noreferrer">{toReturn}</a>;
        }

        return toReturn;
      })}
    </p>
  )
};

/**
 * @todo Fix hydration error so JavaScript isn't needed
 */
export default function NotionRenderer({ blocks }: Props) {
  const [renderBlocks, setRenderBlocks] = useState<any[]>([]);

  useEffect(() => {
    setRenderBlocks(blocks);
  }, [blocks]);

  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
      {renderBlocks.map((block, index) => Renderers[block.type] ? Renderers[block.type](block[block.type], index) : undefined)}
    </div>
  );
}