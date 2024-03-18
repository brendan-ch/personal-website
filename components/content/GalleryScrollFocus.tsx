import styles from './GalleryScrollFocus.module.css';

interface GalleryImage {
  /**
   * Path to the image to display.
   */
  imagePath?: string,
  /**
   * Alt text for the image. Required if `imagePath` is provided.
   */
  imageAlt?: string,
}

interface Props extends React.PropsWithChildren {
  /**
   * Array of gallery images to display with the component.
   */
  images: GalleryImage[],
}

export default function GalleryScrollFocus({ images }: Props) {
  return (
    <></>
  )
}