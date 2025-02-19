import styles from "./input-field.module.css";
import {ChangeEvent, useRef} from "react";

type InputFieldProps = {
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  label?: string,
  formType?: "text" | "password" | "email",
  required?: boolean,
  variant?: "normal" | "transparent",
  onBlur?: () => void,
  size?: "small" | "large"
};

const InputField = ({value, onChange, label, formType, required, variant, onBlur, size}: InputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
      <input
          ref={inputRef}
          onFocus={() => inputRef.current?.select()}
          className={`${styles["input-field"]} ${styles[variant || "normal"]} ${styles[size || "small"]}`}
          type={formType || "text"}
          placeholder={label}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={() => onBlur && onBlur()}
      />
  );
};

export default InputField;