import ArrowUpAndRight from './icons-v2/ArrowUpAndRight';
import styles from '../styles/ExternalLink.module.css';

interface Props {
  name: string,
  url: string,
}

export default function ExternalLink({ name, url }: Props) {
  return (
    <div className={styles.container}>
      {/* Icon */}
      <ArrowUpAndRight
        width={20}
        height={20}
      />
      {/* Text */}
      <a href={url}>
        <p>
          <u>
            {name}
          </u>
        </p>
      </a>
    </div>
  );
}