import ArrowUpAndRight from './icons-v2/ArrowUpAndRight';
import styles from '../styles/ExternalLink.module.css';
import AppStore from './logos/AppStore';
import Figma from './logos/Figma';
import GooglePlay from './logos/GooglePlay';

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
  // Leave last
  {
    icon: (
      <ArrowUpAndRight
        width={ICON_WIDTH}
        height={ICON_HEIGHT}
      />
    ),
    regex: /.+/gm,
  },
];

interface Props {
  name: string,
  url: string,
}

export default function ExternalLink({ name, url }: Props) {
  const iconIndex = SUPPORTED_ICONS.findIndex((obj) => obj.regex.test(url));

  return (
    <div className={styles.container}>
      {/* Icon */}
      {SUPPORTED_ICONS[iconIndex].icon}
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