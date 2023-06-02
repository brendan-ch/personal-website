import Link from 'next/link';
import styles from './PageButton.module.css';

interface Props {
  text: string,
  onClick?: () => any,
  href?: string,
  highlighted?: boolean,
  disabled?: boolean,
}

/**
 * Button intended to be used on a page.
 * @param param0
 * @returns
 */
export default function PageButton({ text, onClick, href, highlighted, disabled }: Props) {
  let className = `${styles.container}`;
  if (highlighted) {
    className += ` ${styles.highlighted}`;
  }
  if (disabled) {
    className += ` ${styles.disabled}`;
  }

  if (href) {
    return (
      (<Link href={href} className={className}>

        <p>
          {text}
        </p>

      </Link>)
    );
  }

  return (
    <button
      className={className}
      onClick={disabled ? undefined : onClick}
    >
      <p>
        {text}
      </p>
    </button>
  );
}