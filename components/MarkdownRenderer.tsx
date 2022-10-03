import Image from 'next/image';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';

import styles from '../styles/MarkdownRenderer.module.css';
import utils from '../styles/utils.module.css';
import { useRouter } from 'next/router';
import { ImageSize } from '../types';

interface Props {
  content: string,
  onImageClick?: (src: string, alt: string) => any,
  imageAspectRatio?: string,
  allImages: ImageSize[],
}

/**
 * Container with styling for markdown content.
 * @param props
 */
export default function MarkdownRenderer({ content, onImageClick, imageAspectRatio, allImages }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [router.asPath]);

  return (
    <article className={styles.container}>
      <ReactMarkdown
        // @ts-ignore
        components={{
          p: 'span',
          a: ({ href, children }: any) => {
            return (
              <u>
                <a href={href} target="_blank" rel="noreferrer">{children}</a>
              </u>
            );
          },
          img: ({ alt, src }: any) => {
            const dimensions = allImages.find((value) => value.imagePath === src);

            return (
              <div
                className={styles.imageContainer}
                style={{
                  aspectRatio: dimensions ? `${dimensions.width} / ${dimensions.height}` : imageAspectRatio,
                }}
              >
                <Image
                  alt={alt || ''}
                  src={src || ''}
                  layout="fill"
                  objectFit="contain"
                  objectPosition="50%"
                  onClick={onImageClick ? () => onImageClick(src!, alt!) : undefined}
                  className={styles.image}
                />
              </div>
            );
          },
        }}
        skipHtml
      >
        {content}
      </ReactMarkdown>
      <div className={utils.spacer}></div>
    </article>
  ); 
}