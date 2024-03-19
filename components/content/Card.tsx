import { CSSProperties } from 'react';
import styles from './Card.module.css';
import { PageExternalLink } from "../../types";
import Image from 'next/image';
import ExternalLink from '../ExternalLink';
import generatePlaceholder from '../../helpers/generatePlaceholder';

interface CardProps {
  /**
   * Title of the card.
   */
  title: string,

  /**
   * Description content of the card.
   */
  description: string,

  /**
   * Path to an image to display in the card.
   * This can be a local path within the `public` folder,
   * or it can be a remote URL.
   */
  imagePath: string,

  /**
   * Alt text for the provided gallery image.
   */
  imageAlt: string,

  /**
   * External links to display within the card.
   */
  externalLinks: PageExternalLink[],

  /**
   * Whether the component should also use the vertical layout
   * on desktop, in addition to mobile.
   */
  keepVertical?: boolean,

  /**
   * Add additional styling options to the card container.
   */
  style?: CSSProperties,
}

/**
 * Component which displays a single project or work experience.
 * Adapts to mobile and desktop layouts.
 * @param param0 
 * 
 * @see [Figma component](https://www.figma.com/file/Dal59aHrblUpA2afXrThW7/bchen.dev?type=design&node-id=1553-2522&mode=design&t=dJcQz7ncJPzewvDt-11)
 */
export default function Card({
  title,
  description,
  imagePath,
  imageAlt,
  externalLinks,
  keepVertical,
  style,
}: CardProps) {
  const placeholderData = generatePlaceholder(imagePath);

  return <div className={keepVertical ? styles.verticalContainer : styles.container} style={style}>
    {/* Text to display on the left/bottom */}
    <div className={styles.text}>
      {/* Title and description */}
      <h1>{title}</h1>
      <p>{description}</p>
      {/* External links to the project, website, etc. */}
      <div className={styles.externalLinks}>
        {externalLinks.map((value, i) => (
          <ExternalLink
            action="open"
            {...value}
            key={i}
          />
        ))}
      </div>
    </div>
    {/* Image to display on the right/top */}
    <div className={styles.imageContainer}>
      <div className={styles.imagePlaceholder} style={placeholderData ? placeholderData.css : undefined}></div>
      <Image
        src={imagePath}
        alt={imageAlt}
        fill
        className={styles.image}
      />
    </div>    
  </div>
}