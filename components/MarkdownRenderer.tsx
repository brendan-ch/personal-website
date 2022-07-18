import Prism from 'prismjs';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import styles from '../styles/MarkdownRenderer.module.css';
import utils from '../styles/utils.module.css';
import ImageWithFadeIn from './ImageWithFadeIn';

interface Props {
  content: string,
  onImageClick?: (src: string, alt: string) => any,
}

/**
 * Container with styling for markdown content.
 * @param props
 */
export default function MarkdownRenderer({ content, onImageClick }: Props) {
  const components = {
    p: 'span',
    a: ({ href, children }: any) => {
      return (
        <u>
          <a href={href}>{children}</a>
        </u>
      );
    },
    img: ({ alt, src }: any) => {
      return (
        <div
          className={styles.imageContainer}
        >
          <ImageWithFadeIn
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
    }
  }

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <article className={styles.container}>
      <ReactMarkdown
        // @ts-ignore
        components={components}
        skipHtml
      >
        {content}
      </ReactMarkdown>
      <div className={utils.spacer}></div>
    </article>
  ); 
}