import styles from '../styles/NotionRenderer.module.css';
import utils from '../styles/utils.module.css';
import returnPlainText from '../helpers/returnPlainText';
import { useEffect, useState } from 'react';
import Lightbox from './Lightbox';
import ImageWithFadeIn from './ImageWithFadeIn';
import richTextRenderer from '../helpers/richTextRenderer';
import { NotionBlock, NotionTextData, SupportedBlockType } from '../types';
import Prism from 'prismjs';
import Link from 'next/link';

/**
 * Object containing block data passed down to each renderer.
 */
interface BlockData {
  /**
   * All blocks passed down from the page.
   */
  blocks: NotionBlock[],
  /**
   * Array index number of the block to render.
   */
  index: number,
}

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
  blocks: NotionBlock[],
}

/**
 * Object containing callbacks to return JSX elements
 * based on block type.
 */
const Renderers: {
  [key in SupportedBlockType]: (blockData: BlockData, callbacks?: Callbacks) => JSX.Element
} = {
  paragraph: (blockData, callbacks) => {
    const item = blockData.blocks[blockData.index];

    // Nest rich text items inside paragraph
    return (
      <p key={blockData.index}>
        {item.paragraph?.rich_text.map(richTextRenderer)}
      </p>
    );
  },
  heading_1: ({ index, blocks }, callbacks) => {
    const block = blocks[index];

    return (
      // Nest rich text items inside heading
      <h1 key={index} id={block.id}>
        {block.heading_1?.rich_text.map(richTextRenderer)}
      </h1>
    );
  },
  heading_2: ({ blocks, index }, callbacks) => {
    const block = blocks[index];

    return (
      // Nest rich text items inside heading
      <h2 key={index} id={block.id}>
        {block.heading_2?.rich_text?.map(richTextRenderer)}
      </h2>
    );
  },
  heading_3: ({ blocks, index }, callbacks) => {
    const block = blocks[index];

    return (
      // Nest rich text items inside heading
      <h3 key={index} id={block.id}>
        {block.heading_3?.rich_text?.map(richTextRenderer)}
      </h3>
    );
  },
  bulleted_list_item: ({ index, blocks }, callbacks) => {
    const block = blocks[index];
    const children = block[block.type]?.children;

    return (
      <ul key={index}>
        <li>
          {block.bulleted_list_item?.rich_text.map(richTextRenderer)}
        </li>
        {/* Indent */}
        <div className={styles.bulletedListIndentContainer}>
          {children
            ? children.map((child: NotionBlock, i: number) => 
              Renderers[child.type] ? Renderers[child.type]({
                blocks: children,
                index: i,
              }, callbacks) : undefined
            )
            : undefined
          }
        </div>
      </ul>
    )
  },
  numbered_list_item: (blockData, callbacks) => {
    return Renderers.bulleted_list_item(blockData, callbacks);
  },
  toggle: (blockData, callbacks) => {
    return Renderers.bulleted_list_item(blockData, callbacks);
  },
  image: ({ blocks, index }, callbacks) => {
    const block = blocks[index];

    let src = block.image?.type === 'file' ? block.image.file?.url : block.image?.external?.url;
    const caption = block.image?.caption ? returnPlainText(block.image.caption) : undefined;

    if (!src) {
      src = '';
    }
    
    return (
      <div
        className={styles.imageContainer}
        key={index}
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
  divider: ({ index, blocks }, callbacks) => (
    <div key={index} className={styles.divider} role="separator" />
  ),
  callout: ({ index, blocks }, callbacks) => {
    const block = blocks[index];
    const children = block[block.type]?.children;

    return (
      <aside key={index}>
        {/* <div className={styles.calloutIconContainer}> */}
          {/* Icon placeholder component */}
        {/* </div> */}
        <div className={`${styles.calloutTitleChildrenContainer} ${styles.titleChildrenContainer}`}>
          <p>
            {block.callout?.rich_text.map(richTextRenderer)}
          </p>
          {/* Render children */}
          {children
            ? children.map((child: NotionBlock, i: number) => 
              Renderers[child.type] ? Renderers[child.type]({
                blocks: children,
                index: i,
              }, callbacks) : undefined
            )
            : undefined
          }
        </div>
      </aside>
    );
  },
  quote: ({ index, blocks }, callbacks) => {
    const item = blocks[index];
    const children = item[item.type]?.children;

    return (
      <blockquote key={index} role="complementary">
        <div className={`${styles.titleChildrenContainer} ${styles.quoteTitleChildrenContainer}`}>
          <p>
            {item.quote?.rich_text.map(richTextRenderer)}
          </p>
          {/* Render children */}
          {children
            ? children.map((child: NotionBlock, i: number) => 
              Renderers[child.type] ? Renderers[child.type]({ 
                blocks: children,
                index: i,
               }, callbacks) : undefined
            )
            : undefined
          }
        </div>
      </blockquote>
    );
  },
  code: ({ index, blocks }, callbacks) => {
    const item = blocks[index];
    const lang = item.code?.language;
    const code = item.code?.rich_text ? returnPlainText(item.code?.rich_text) : undefined;

    return (
      <pre key={index} role="code">
        <code className={`language-${lang}`}>{code}</code>
      </pre>
    );
  },
  table_of_contents: ({ index, blocks }, callbacks) => {
    const headingBlocks = blocks.filter((block) => block.type.startsWith('heading'));

    return (
      <div className={styles.tocContainer} key={index} role="list">
        {headingBlocks.map((headingBlock, index) => {
          let numSpacers = 0;
          if (headingBlock.type === 'heading_2') {
            numSpacers = 1;
          } else if (headingBlock.type === 'heading_3') {
            numSpacers = 2;
          }

          return (
            <div className={styles.tocLine} key={index} role="listitem">
              <div
                className={styles.tocSpacer}
                style={{
                  width: 24 * numSpacers,
                }}
              />
              <Link href={`#${headingBlock.id}`}>
                <a>
                  <p>
                    {(headingBlock[headingBlock.type] as NotionTextData).rich_text.map(richTextRenderer)}
                  </p>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
  // column_list: ({ index, blocks }, callbacks) => {
  //   console.log(blocks[index]);

  //   return (
  //     <div />
  //   );
  // },
  // column: ({ index, blocks }, callbacks) => {
  //   console.log(blocks[index]);
    
  //   return (
  //     <div />
  //   );
  // },
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

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const callbacks: Callbacks = {
    onImageClick: handleImageClick,
  };

  return (
    <div className={styles.container}>
      {blocks.map((block, index) => Renderers[block.type] ? Renderers[block.type]({
        blocks,
        index,
      }, callbacks) : undefined)}
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