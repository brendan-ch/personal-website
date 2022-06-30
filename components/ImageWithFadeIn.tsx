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
  const [loadingState, setLoadingState] = useState(LoadingState.BEFORE);
  const [fullOpacity, setFullOpacity] = useState(false);

  useEffect(() => {
    let isSafari = navigator.userAgent.indexOf("Chrome") <= -1 && navigator.userAgent.indexOf("Safari") > -1;

    setLoadingState(LoadingState.LOADING);
    if (isSafari) {
      setFullOpacity(true);
    }
  }, []);

  let className = `${props.className}`;
  if (loadingState === LoadingState.LOADING && !fullOpacity) {
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