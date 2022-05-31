import styles from '../styles/PageHeader.module.css';

interface Props {
  includeBackButton?: boolean,
  includeLogo?: boolean,
  aboveText: string,
  belowText: string,
}

export default function PageHeader({ includeBackButton, includeLogo, aboveText, belowText }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2>{aboveText}</h2>
        <h1>{belowText}</h1>
      </div>
      {includeLogo && (
        <div className={styles.logo}></div>
      )}
    </div>
  );
}