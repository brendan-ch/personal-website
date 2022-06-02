import { useRouter } from 'next/router';
import styles from '../styles/PageHeader.module.css';
import Back from './icons/Back';

interface Props {
  includeBackButton?: boolean,
  includeLogo?: boolean,
  aboveText: string,
  belowText: string,
}

/**
 * Returns a page header with a back button. If width < 600px,
 * doesn't display anything.
 * @param props
 * @returns
 */
export default function PageHeader({ includeBackButton, includeLogo, aboveText, belowText }: Props) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        {includeBackButton ? (
          <h2 className={styles.backButton} onClick={() => router.back()}>
            {/* <svg width="30" height="30" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.6162 6.25L9.38406 12.4822L15.6162 18.7143" stroke="#BCBCBC" />
            </svg> */}
            <Back
              width={30}
              height={30}
            />
            {aboveText}
          </h2>
        ) : (
          <h2>
            {aboveText}
          </h2>
        )}
        <h1>{belowText}</h1>
      </div>
      {includeLogo && (
        <div className={styles.logo}></div>
      )}
    </div>
  );
}