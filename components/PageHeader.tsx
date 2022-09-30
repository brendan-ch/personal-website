import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/PageHeader.module.css';
import ChevronLeft from './icons-v2/ChevronLeft';
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
              <p className={styles.backButton}>
                <ChevronLeft
                  width={16}
                  height={16}
                />
                {aboveText}
              </p>
            </a>
          </Link>
        ) : (
          <h3>
            {aboveText}
          </h3>
        )}
        <h1>{belowText}</h1>
      </div>
    </div>
  );
}