import styles from './input-field.module.css';

type InputFieldProps = {
  label?: string,
  form?: boolean,
  formType?: 'text' | 'password' | 'email',
  required?: boolean
};

const InputField = ({label, form, formType, required}: InputFieldProps) => {
  if (form) {
    return (
        <input className={styles['input-field']} type={formType || 'text'} placeholder={label} required={required} />
    );
  }
  else {
    return (
        <div>input field</div>
    );
  }
};

export default InputField;