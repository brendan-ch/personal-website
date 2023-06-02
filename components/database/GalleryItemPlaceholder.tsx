import styles from './GalleryItemPlaceholder.module.css';

export default function GalleryItemPlaceholder() {
  const children = (
    <div className={styles.container}>
      <div className={styles.imagePlaceholder}></div>
      <div className={styles.details}>
        <div className={styles.titlePlaceholder}></div>
        <div className={styles.descriptionPlaceholder}></div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}