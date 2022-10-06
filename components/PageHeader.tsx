import Link from 'next/link';
import React from 'react';
import styles from '../styles/PageHeader.module.css';

interface Breadcrumb {
  name: string,
  href: string,
}

interface Props {
  breadcrumb?: Breadcrumb[],
  belowText: string,
}

/**
 * Returns a page header with a back button. If width < 600px,
 * doesn't display anything.
 * @param props
 * @returns
 */
export default function PageHeader({ belowText, breadcrumb }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.breadcrumbDiv}>
          {breadcrumb ? breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              <Link href={item.href}>
                <a>
                  <p>
                    {item.name}
                  </p>
                </a>
              </Link>
              {index !== breadcrumb.length - 1 ? (
                <p>
                  /
                </p>
              ) : undefined}
            </React.Fragment>
          )) : undefined}
        </div>
        <h1>{belowText}</h1>
      </div>
    </div>
  );
}