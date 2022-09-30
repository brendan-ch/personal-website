import ArrowUpAndRight from './icons-v2/ArrowUpAndRight';
import styles from '../styles/ExternalLink.module.css';
import AppStore from './logos/AppStore';
import Figma from './logos/Figma';
import GooglePlay from './logos/GooglePlay';
import { PageExternalLink } from '../types';

const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;

/**
 * Array containing supported icon with URL regex matcher.
 */
const SUPPORTED_ICONS = [
  {
    icon: (
      <AppStore
        width={ICON_WIDTH}
        height={ICON_HEIGHT}
      />
      ),
      regex: /.+apps\.apple\.com.+/gm,
  },
  {
    icon: (
      <GooglePlay
        width={ICON_WIDTH}
        height={ICON_HEIGHT}
      />
      ),
      regex: /.+play\.google\.com.+/gm,
  },
  {
    icon: (
      <Figma
        width={ICON_WIDTH}
        height={ICON_HEIGHT}
      />
      ),
      regex: /.+figma\.com.+/gm,
  },
];

export default function ExternalLink({ name, url }: PageExternalLink) {
  const iconIndex = SUPPORTED_ICONS.findIndex((obj) => obj.regex.test(url));

  return (
    <div className={styles.container}>
      {/* Icon */}
      {iconIndex > -1 ? SUPPORTED_ICONS[iconIndex].icon : (
        <ArrowUpAndRight
          width={ICON_WIDTH}
          height={ICON_HEIGHT}
        />
      )}
      {/* Text */}
      <a href={url} target="_blank" rel="noreferrer">
        <p>
          <u>
            {name}
          </u>
        </p>
      </a>
    </div>
  );
}