import generatePlaceholder from '../../helpers/generatePlaceholder';
import styles from './Focus.module.css';
import Image from 'next/image';

interface Props extends React.PropsWithChildren {
  /**
   * Path to the image to display.
   */
  imagePath?: string,
  /**
   * Alt text for the image. Required if `imagePath` is provided.
   */
  imageAlt?: string,
}

/**
 * Component which gains the user's attention by focusing on something specific.
 * Comes with an image option.
 * @param param0
 * @returns
 * 
 * @see [Figma component](https://www.figma.com/file/Dal59aHrblUpA2afXrThW7/bchen.dev?type=design&node-id=1553-3271&mode=design&t=dJcQz7ncJPzewvDt-11)
 */
export default function Focus({ children, imagePath, imageAlt }: Props) {
  const placeholderData = imagePath ? generatePlaceholder(imagePath) : undefined;

  return (
    <div className={imagePath && imageAlt ? `${styles.focus} ${styles.focusWithImage}` : styles.focus}>
      <div className={styles.focusContent}>
        {children}
      </div>
      {imagePath && imageAlt ? (
        <div className={styles.imageContainer}>
          <div className={styles.imagePlaceholder} style={placeholderData ? placeholderData.css : undefined}></div>
          <Image
            src={imagePath}
            alt={imageAlt}
            fill
            className={styles.image}
          />
        </div>
      ) : <></>}
    </div>
  );
}