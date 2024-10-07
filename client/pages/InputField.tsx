import React from 'react';
import styles from '../styles/LoginPage.module.css';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  iconSrc: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, iconSrc }) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.inputLabel} htmlFor={`${label.toLowerCase()}Input`}>{label}</label>
      <div className={styles.inputWrapper}>
        <div className={styles.inputField}>
          <img loading="lazy" src={iconSrc} alt="" className={styles.inputIcon} />
          <input
            type={type}
            id={`${label.toLowerCase()}Input`}
            placeholder={placeholder}
            className={styles.inputPlaceholder}
            aria-label={label}
          />
        </div>
      </div>
    </div>
  );
};

export default InputField;