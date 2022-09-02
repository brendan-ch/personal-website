import styles from '../styles/TextInput.module.css';
import { useState } from "react";

interface Props {
  placeholder?: string,
  pattern?: RegExp,
  /**
   * Error to display if regex is not matched.
   */
  noMatchError?: string,
  label?: string,
}

export default function FormInput({ noMatchError, placeholder, pattern, label }: Props) {
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
      <div>
        <label>
          {label}
        </label>
      </div>
      {/* Input */}
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={text}
        onBlur={validateString}
        onChange={(e) => setText(e.target.value)}
      >
      </input>
      {/* Error message */}
      {hasError ? (
        <p className={styles.error}>{noMatchError}</p>
      ) : undefined}
    </div>
  );
}