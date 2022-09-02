import styles from '../styles/FormInput.module.css';
import { useState } from "react";

interface Props {
  placeholder?: string,
  pattern?: RegExp,
  /**
   * Error to display if regex is not matched.
   */
  noMatchError?: string,
  label?: string,
  multiline?: boolean,
  required?: boolean,
}

export default function FormInput({ noMatchError, placeholder, pattern, label, multiline, required }: Props) {
  const [text, setText] = useState('');
  const [hasError, setHasError] = useState(false);

  /**
   * Test the string against the given regex pattern.
   */
  function validateString() {
    if (pattern && pattern.test(text)) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <label>
          {label}
        </label>
        <p className={styles.red}>
          {required ? '*' : undefined}
        </p>
      </div>
      {/* Input */}
      {multiline ? (
        <textarea
          className={`${styles.input} ${styles.multiline}`}
          placeholder={placeholder}
          value={text}
          onBlur={validateString}
          onChange={(e) => setText(e.target.value)}
        >
          
        </textarea>
      ) : (
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          value={text}
          onBlur={validateString}
          onChange={(e) => setText(e.target.value)}
          required={required}
        >
        </input>
      )}
      {/* Error message */}
      <div className={styles.errorContainer}>
        <p className={styles.error}>{hasError ? noMatchError : ' '}</p>
      </div>
    </div>
  );
}