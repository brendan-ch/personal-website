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
      {block.rich_text.map((richTextItem: any, index: number) => (
        <p key={index}>{richTextItem.text.content}</p>
      ))}
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