import styles from './Anchor.module.css'
import utils from '../styles/utils.module.css'

interface Props {
  text: string,
  // href?: string,
  hideBorder?: boolean,

  /**
   * If provided, the ID is passed to the underlying div element.
   * This is useful for allowing links to anchor elements.
   */
  id?: string,

  /**
   * Custom styling for the anchor component.
   */
  style?: React.CSSProperties,
}

/**
 * Anchor element which can be used as a heading.
 * Note that on screen readers, this component takes precedence over other heading elements.
 * 
 * @param param0
 * @returns
 */
export default function Anchor({
  text,
  // href,
  hideBorder,
  id,
  style,
}: Props) {
  return (
    <div
      className={hideBorder ? `${styles.container} ${styles.noLine}` : styles.container}
      id={id}
      style={style}
    >
      <h1 className={`${utils.monoText} ${utils.smallText}`}>{text}</h1>
    </div>
  );
}