import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

import styles from '../styles/ImageWithFadeIn.module.css';

enum LoadingState {
  BEFORE,
  LOADING,
  DONE,
}

/**
 * Component that fades in an image as soon as it loads.
 * Takes same props as `next/image`.
 * @param props
 * @returns
 */
export default function ImageWithFadeIn(props: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [loadingState, setLoadingState] = useState(LoadingState.BEFORE);

  useEffect(() => {
    setLoadingState(LoadingState.LOADING);
  }, []);

  let className = `${props.className}`;
  if (loadingState === LoadingState.LOADING) {
    className = `${props.className} ${styles.invisible}`;
  } else if (loadingState === LoadingState.DONE) {
    className = `${props.className} ${styles.fadeIn}`;
  }
  
  return (
    /* eslint-disable-next-line */
    <Image
      {...props}
      className={className}
      onLoadingComplete={() => setLoadingState(LoadingState.DONE)}
    />
  );
}