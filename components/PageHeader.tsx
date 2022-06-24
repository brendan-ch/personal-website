import { useRouter } from 'next/router';
import styles from '../styles/PageHeader.module.css';
import Back from './icons/Back';

interface Props {
  includeBackButton?: boolean,
  aboveText: string,
  belowText: string,
}

/**
 * Returns a page header with a back button. If width < 600px,
 * doesn't display anything.
 * @param props
 * @returns
 */
export default function PageHeader({ includeBackButton, aboveText, belowText }: Props) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        {includeBackButton ? (
          <h3 className={styles.backButton} onClick={() => router.back()}>
            <Back
              width={30}
              height={30}
            />
            {aboveText}
          </h3>
        ) : (
          <h2>
            {aboveText}
          </h2>
        )}
        <h1>{belowText}</h1>
      </div>
    </div>
  );
}