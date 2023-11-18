import styles from './Focus.module.css';
import utils from '../../styles/utils.module.css';

interface Props {
  children: React.ReactNode | React.ReactNode[],
}

export default function Focus({ children }: Props) {
  return (
    <div className={styles.focus}>
      <div className={styles.focusContent}>
        {children}
      </div>
    </div>
  );
}