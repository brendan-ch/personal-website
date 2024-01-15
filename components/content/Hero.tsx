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

export default function Hero({ imagePath, imageAlt, children }: Props) {
  return <div>
    <Image
      src={imagePath}
      alt={imageAlt}
      fill
      priority
      className={styles.heroImage}
    />
    <div>
      <div>
        {children}
      </div>
    </div>
  </div>
}