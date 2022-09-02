import styles from '../styles/TextInput.module.css';
import { useState } from "react";

interface Props {
  error?: string,
  onBlur?: (text: string) => any,
  placeholder?: string,
  showError?: boolean,
}

export default function TextInput({ error, onBlur, placeholder, showError }: Props) {
  const [text, setText] = useState('');

  return (
    <div>
      {/* Input */}
      <input
        onBlur={onBlur ? () => onBlur(text) : undefined}
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      >
      </input>
      {/* Error message */}
      {showError ? (
        <p className={styles.error}>{error}</p>
      ) : undefined}
    </div>
  );
}