import styles from './input-field.module.css';

type InputFieldProps = {
  label?: string,
  form?: boolean,
  formType?: 'text' | 'password' | 'email';
};

const InputField = ({label, form, formType}: InputFieldProps) => {
  if (form) {
    return (
        <input className={styles['input-field']} type={formType || 'text'} placeholder={label} />
    );
  }
  else {
    return (
        <div>input field</div>
    );
  }
};

export default InputField;