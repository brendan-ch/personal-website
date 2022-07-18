import Prism from 'prismjs';
import { Fragment, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';

import styles from '../styles/MarkdownRenderer.module.css';
import utils from '../styles/utils.module.css';
import ImageWithFadeIn from './ImageWithFadeIn';
import Lightbox from './Lightbox';

interface Props {
  content: string,
}

/**
 * Container with styling for markdown content.
 */
export default function MarkdownRenderer({ content }: Props) {
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

  // useEffect(() => {
  //   Prism.highlightAll();
  // }, []);

  return (
    <article className={styles.container}>
      <ReactMarkdown
        // disallowedElements={['Paragraph']}
        // unwrapDisallowed
        components={{
          p: 'span',
          img: ({ alt, src }) => {
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
                  onClick={() => handleImageClick(src!, alt!)}
                  className={styles.image}
                />
              </div>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
      <div className={utils.spacer}></div>
      <Lightbox
        imageLink={lightboxImageLink}
        visible={lightboxImageLink !== undefined}
        caption={lightboxCaption}
        onClose={handleImageClose}
      />
    </article>
  ); 
}