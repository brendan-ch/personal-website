import { useLayoutEffect, useRef, useState } from 'react';
import styles from './GalleryScrollFocus.module.css';
import Image from 'next/image';

interface GalleryImage {
  /**
   * Path to the image to display.
   */
  imagePath: string,
  /**
   * Alt text for the image. Required if `imagePath` is provided.
   */
  imageAlt: string,
}

interface Props extends React.PropsWithChildren {
  /**
   * Array of gallery images to display with the component.
   */
  images: GalleryImage[],
}

/**
 * Component which gains the user's attention by focusing on something specific.
 * Pass in a gallery of images which scroll while the children elements stick
 * to the viewport.
 * @param param0
 * @returns
 * 
 * @see {Figma component}(https://www.figma.com/file/Dal59aHrblUpA2afXrThW7/bchen.dev?type=design&node-id=1701-1475&mode=design&t=7Zzw0Yri5WF9ynbK-11)
 */
export default function GalleryScrollFocus({ images, children }: Props) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    function updateGalleryPositioning() {
      const imageHeight = galleryRef.current?.children.item(0)?.clientHeight;
      const innerHeight = window.innerHeight;
  
      if (galleryRef.current && imageHeight) {
        // console.log('Updating');
        galleryRef.current.style.paddingTop = `${(innerHeight - imageHeight) / 2}px`;
        galleryRef.current.style.paddingBottom = `${(innerHeight - imageHeight) / 2}px`;
        // console.log(galleryRef.current.style);
      }
    }

    window.addEventListener('resize', updateGalleryPositioning);
    updateGalleryPositioning();

    return () => {
      window.removeEventListener('resize', updateGalleryPositioning);
    }
  }, []);

  return (
    <div className={styles.focus}>
      <div className={styles.focusContent}>
        {children}
      </div>

      <div className={styles.gallery} ref={galleryRef}>
        {images.map(({ imagePath, imageAlt }) => (
          <div className={styles.imageContainer} key={imagePath}>
            <Image
              src={imagePath}
              alt={imageAlt}
              fill
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  )
}