import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/PageHeader.module.css';
import Back from './icons/Back';

interface Props {
  includeBackButton?: boolean,
  backButtonHref?: string,
  aboveText: string,
  belowText: string,
}

/**
 * Returns a page header with a back button. If width < 600px,
 * doesn't display anything.
 * @param props
 * @returns
 */
export default function PageHeader({ includeBackButton, aboveText, belowText, backButtonHref }: Props) {
  // const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        {includeBackButton ? (
          <Link href={backButtonHref || '/'}>
            <a>
              <h3 className={styles.backButton}>
                <Back
                  width={30}
                  height={30}
                />
                {aboveText}
              </h3>
            </a>
          </Link>
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