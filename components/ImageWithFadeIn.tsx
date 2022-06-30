import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

import styles from '../styles/ImageWithFadeIn.module.css';

/**
 * Component that fades in an image as soon as it loads.
 * Takes same props as `next/image`.
 * @param props
 * @returns
 */
export default function ImageWithFadeIn(props: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    /* eslint-disable-next-line */
    <Image
      {...props}
      className={loaded ? `${props.className} ${styles.fadeIn}` : `${props.className}`}
      onLoad={() => setLoaded(true)}
    />
  );
}