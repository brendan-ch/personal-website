import { PageExternalLink } from "../../types";
import styles from '../../styles/ShareCTA.module.css';
import ExternalLink from "../ExternalLink";

interface Props {
  /**
   * Additional share links to include, in addition to the "Copy to clipboard" button.
   */
  links: PageExternalLink[],
  /**
   * Link for the current page to copy.
   */
  copyLink: string,
}

/**
 * Add this component at the end of a project to encourage people to share it.
 * @param props
 */
function ShareCTA({ links, copyLink }: Props) {
  return (
    <div className={styles.container}>
      <p>Like this project? Consider sharing it:</p>
      <ExternalLink
        name="Copy link"
        url={copyLink}
        action="copy"
      />
      {links.map((value) => (
        <ExternalLink
          key={value.url}
          {...value}
        />
      ))}
    </div>
  );
}

export default ShareCTA;