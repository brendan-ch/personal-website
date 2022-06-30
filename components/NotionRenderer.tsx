import Image from 'next/image';
import styles from '../styles/NotionRenderer.module.css';
import utils from '../styles/utils.module.css';
import returnPlainText from '../helpers/returnPlainText';
import { useState } from 'react';
import Lightbox from './Lightbox';

interface Props {
  /**
   * Array of Notion blocks to render on the page.
   */
  blocks: any[],
}

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
      <ul key={key}>
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
      </ul>
    )
  },
  numbered_list_item: (block: any, key: string | number, children?: any[]) => {
    return Renderers.bulleted_list_item(block, key, children);
  },
  toggle: (block: any, key: string | number, children?: any) => {
    return (
      <div key={key}>
        <li>
          {block.rich_text.map(richTextRenderer)}
        </li>
        {/* Indent */}
        {children
          ? children.map((child: any, i: number) => 
            // @ts-ignore
            Renderers[child.type] ? Renderers[child.type](child[child.type], i, child.children) : undefined
          )
          : undefined
        }
      </div>
    )
  },
  image: (block: any, key: string | number, children?: any, onImageClick?: (src?: string, caption?: string) => any) => {
    const src = block.type === 'file' ? block.file.url : block.external.url;
    const caption = returnPlainText(block.caption);

    const placeholder: string | undefined = block.placeholder;
    
    return (
      <div
        className={styles.imageContainer}
        key={key}
      >
        <Image
          blurDataURL={placeholder}
          placeholder={placeholder ? 'blur' : 'empty'}
          onClick={onImageClick ? () => onImageClick(src, caption) : undefined}
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
    <div key={key} className={styles.divider} />
  ),
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

  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
      {blocks.map((block, index) => Renderers[block.type] ? Renderers[block.type](block[block.type], index, block.children, handleImageClick) : undefined)}
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