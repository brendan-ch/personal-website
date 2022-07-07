import styles from '../styles/NotionRenderer.module.css';
import utils from '../styles/utils.module.css';
import returnPlainText from '../helpers/returnPlainText';
import { useState } from 'react';
import Lightbox from './Lightbox';
import ImageWithFadeIn from './ImageWithFadeIn';
import richTextRenderer from '../helpers/richTextRenderer';

/**
 * Object containing callbacks passed to each renderer.
 */
interface Callbacks {
  // User actions start with "on"
  /**
   * Called when the user clicks on an image.
   */
  onImageClick?: (link: string, caption: string) => any,
  
  /**
   * Called when the table of contents block is rendered.
   * @todo render the table of contents block
   */
  renderTableOfContents?: () => any,
}

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
  bulleted_list_item: (block: any, key: string | number, children?: any[], callbacks?: Callbacks) => {
    return (
      <ul key={key}>
        <li>
          {block.rich_text.map(richTextRenderer)}
        </li>
        {/* Indent */}
        <div className={styles.bulletedListIndentContainer}>
          {children
            ? children.map((child: any, i: number) => 
              // @ts-ignore
              Renderers[child.type] ? Renderers[child.type](child[child.type], i, child[child.type].children, callbacks) : undefined
            )
            : undefined
          }
        </div>
      </ul>
    )
  },
  numbered_list_item: (block: any, key: string | number, children?: any[]) => {
    return Renderers.bulleted_list_item(block, key, children);
  },
  toggle: (block: any, key: string | number, children?: any) => {
    return Renderers.bulleted_list_item(block, key, children);
  },
  image: (block: any, key: string | number, children?: any, callbacks?: Callbacks) => {
    const src = block.type === 'file' ? block.file.url : block.external.url;
    const caption = returnPlainText(block.caption);
    
    return (
      <div
        className={styles.imageContainer}
        key={key}
      >
        <ImageWithFadeIn
          // @ts-ignore
          onClick={callbacks?.onImageClick ? () => callbacks.onImageClick(src, caption) : undefined}
          alt={caption}
          src={src}
          layout="fill"
          objectFit="contain"
          objectPosition="50%"
          className={styles.image}
        />
      </div>
    );
  },
  divider: (block: any, key: string | number) => (
    <div key={key} className={styles.divider} role="separator" />
  ),
  callout: (block: any, key: string | number, children?: any, callbacks?: Callbacks) => {
    return (
      <aside key={key}>
        {/* <div className={styles.calloutIconContainer}> */}
          {/* Icon placeholder component */}
        {/* </div> */}
        <div className={`${styles.calloutTitleChildrenContainer} ${styles.titleChildrenContainer}`}>
          <p>
            {block.rich_text.map(richTextRenderer)}
          </p>
          {/* Render children */}
          {children
            ? children.map((child: any, i: number) => 
              // @ts-ignore
              Renderers[child.type] ? Renderers[child.type](child[child.type], i, child[child.type].children, callbacks) : undefined
            )
            : undefined
          }
        </div>
      </aside>
    );
  },
  quote: (block: any, key: string | number, children?: any, callbacks?: Callbacks) => {
    return (
      <blockquote key={key} role="complementary">
        <div className={`${styles.titleChildrenContainer} ${styles.quoteTitleChildrenContainer}`}>
          <p>
            {block.rich_text.map(richTextRenderer)}
          </p>
          {/* Render children */}
          {children
            ? children.map((child: any, i: number) => 
              // @ts-ignore
              Renderers[child.type] ? Renderers[child.type](child[child.type], i, child[child.type].children, callbacks) : undefined
            )
            : undefined
          }
        </div>
      </blockquote>
    );
  }
};

/**
 * Notion rendering component which takes an array of block objects
 * from the official API.
 * @param props
 * @returns
 */
export default function NotionRenderer({ blocks }: Props) {
  const [lightboxImageLink, setLightboxImageLink] = useState<string>();
  const [lightboxCaption, setLightboxCaption] = useState<string>();
  
  function handleImageClick(link: string, caption: string) {
    setLightboxImageLink(link);
    setLightboxCaption(caption);
  }

  function handleImageClose() {
    setLightboxImageLink(undefined);
    setLightboxCaption(undefined);
  }

  const callbacks: Callbacks = {
    onImageClick: handleImageClick,
  };

  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
      {blocks.map((block, index) => Renderers[block.type] ? Renderers[block.type](block[block.type], index, block[block.type].children, callbacks) : undefined)}
      <div className={utils.spacer}></div>
      <Lightbox
        imageLink={lightboxImageLink}
        visible={lightboxImageLink !== undefined}
        caption={lightboxCaption}
        onClose={handleImageClose}
      />
    </div>
  );
}