import ArrowUpAndRight from './icons/ArrowUpAndRight';
import styles from './ExternalLink.module.css';
import AppStore from './logos/AppStore';
import Figma from './logos/Figma';
import GitHub from './logos/GitHub';
import GooglePlay from './logos/GooglePlay';
import LinkedIn from './logos/LinkedIn';
import Twitter from './logos/Twitter';
import { PageExternalLink } from '../types';
import Copy from './icons/Copy';
import { useCallback, useEffect, useState } from 'react';

const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;
const COPY_TIMEOUT = 1000;

interface Props extends PageExternalLink {
  action?: 'open' | 'copy',
}


export default function ExternalLink({ name, url, action }: Props) {
  const [copied, setCopied] = useState(false);

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
        <GitHub
          width={ICON_WIDTH}
          height={ICON_HEIGHT}
        />
        ),
        regex: /.+github\.com.+/gm,
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
    {
      icon: (
        <LinkedIn
          width={ICON_WIDTH}
          height={ICON_HEIGHT}
        />
        ),
        regex: /.+linkedin\.com.+/gm,
    },
    {
      icon: (
        <Twitter
          width={ICON_WIDTH}
          height={ICON_HEIGHT}
        />
        ),
        regex: /.+twitter\.com.+/gm,
    },
  ];
  
  const iconIndex = SUPPORTED_ICONS.findIndex((obj) => obj.regex.test(url));
  let icon = (
    <ArrowUpAndRight
      width={ICON_WIDTH}
      height={ICON_HEIGHT}
    />
  );

  if (action === 'copy') {
    icon = <Copy width={ICON_WIDTH} height={ICON_HEIGHT} />
  } else if (iconIndex >= 0) {
    icon = SUPPORTED_ICONS[iconIndex].icon;
  }

  /**
   * Write to the user's clipboard and set state.
   */
  const handleCopy = useCallback(function handleCopy() {
    navigator.clipboard.writeText(url);

    setCopied(true);
  }, [url]);

  useEffect(() => {
    // If copied state set to true, start a timer to set it back to false
    function handleSetCopyToFalse() {
      setCopied(false);
    }
    
    if (copied) {
      const id = setTimeout(handleSetCopyToFalse, COPY_TIMEOUT);
      return () => clearTimeout(id);
    }

    return () => {};
  }, [copied]);

  const childText = (
    <p>
      <u>
        {name}
      </u>
    </p>
  );
  let childContent = (
    <a href={url} target="_blank" rel="noreferrer">
      {childText}
    </a>
  );
  if (copied) {
    childContent = (
      <p>
        Link copied to clipboard!
      </p>
    );
  } else if (action === 'copy') {
    childContent = (
      <button onClick={handleCopy}>
        {childText}
      </button>
    );
  }

  return (
    <div className={styles.container}>
      {/* Icon */}
      {icon}
      {/* Text */}
      {childContent}
    </div>
  );
}