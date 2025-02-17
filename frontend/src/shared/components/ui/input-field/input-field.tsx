import styles from './input-field.module.css';
import {ChangeEvent} from 'react';

type InputFieldProps = {
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  label?: string,
  formType?: 'text' | 'password' | 'email',
  required?: boolean
};

const InputField = ({value, onChange, label, formType, required}: InputFieldProps) => {
  return (
      <input
          className={styles['input-field']}
          type={formType || 'text'}
          placeholder={label}
          required={required}
          value={value}
          onChange={onChange}
      />
  );
};

export default InputField;