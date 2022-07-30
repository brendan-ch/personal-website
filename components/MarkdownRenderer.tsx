import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import styles from '../styles/MarkdownRenderer.module.css';
import utils from '../styles/utils.module.css';

interface Props {
  content: string,
  onImageClick?: (src: string, alt: string) => any,
}

/**
 * Container with styling for markdown content.
 * @param props
 */
export default function MarkdownRenderer({ content, onImageClick }: Props) {
  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoaded(true);
  //   }, 1000);
  // }, []);

  // useEffect(() => {
    // if (loaded) {
    // Prism.highlightAll();
    // }
  // }, []);

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
            return (
              <div
                className={styles.imageContainer}
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
          }
        }}
        skipHtml
      >
        {content}
      </ReactMarkdown>
      <div className={utils.spacer}></div>
    </article>
  ); 
}