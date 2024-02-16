import Image from 'next/image';
import styles from './Hero.module.css';

interface Props extends React.PropsWithChildren {
  /**
   * Path to an image to display.
   * This can be a local path within the `public` folder,
   * or it can be a remote URL.
   * 
   * Domains of remote URLs must be configured in next.config.js.
   * See https://nextjs.org/docs/pages/building-your-application/optimizing/images#domains for more info.
   */
  imagePath: string,

  /**
   * Alt text for the hero image.
   */
  imageAlt: string,
}

/**
 * Component which displays children with a full-screen background image.
 * @param param0
 * @returns
 * 
 * @see [Figma component](https://www.figma.com/file/Dal59aHrblUpA2afXrThW7/bchen.dev?type=design&node-id=1676-8810&mode=design&t=dJcQz7ncJPzewvDt-11)
 */
export default function Hero({ imagePath, imageAlt, children }: Props) {
  return (
    <div className={styles.hero}>
      <Image
        src={imagePath}
        alt={imageAlt}
        fill
        priority
        className={styles.heroImage}
      />
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          {children}
        </div>
      </div>
    </div>
  );
}