import styles from '../styles/FormInput.module.css';
import { useState } from "react";
import { FormInputItem } from '../types';

enum ErrorType {
  NONE,
  INPUT_REQUIRED,
  VALIDATION_ERROR,
}

export default function FormInput({ noMatchError, placeholder, pattern, label, multiline, required, name }: FormInputItem) {
  const [text, setText] = useState('');
  const [error, setError] = useState(ErrorType.NONE);

  /**
   * Test the string against the given regex pattern.
   */
  function validateString() {
    if (required && !text) {
      setError(ErrorType.INPUT_REQUIRED);
    } else if (pattern && !pattern.test(text)) {
      setError(ErrorType.VALIDATION_ERROR);
    } else {
      setError(ErrorType.NONE);
    }
  }

  let errorMessage = noMatchError;
  if (error === ErrorType.INPUT_REQUIRED) {
    errorMessage = 'Please fill out this field.';
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
          name={name}
          className={`${styles.input} ${styles.multiline}`}
          placeholder={placeholder}
          value={text}
          onBlur={validateString}
          onChange={(e) => setText(e.target.value)}
        >
          
        </textarea>
      ) : (
        <input
          name={name}
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
        <p className={styles.error}>{error !== ErrorType.NONE ? errorMessage : undefined}</p>
      </div>
    </div>
  );
}