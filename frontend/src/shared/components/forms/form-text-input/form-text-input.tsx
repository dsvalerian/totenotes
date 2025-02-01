import styles from './form-text-input.module.css';

type FormTextInputProps = {
  id: string,
  label: string,
  placeholder?: string
  type?: 'text' | 'password' | 'email';
  required?: boolean
};

const FormTextInput = ({id, label, placeholder, type, required}: FormTextInputProps) => {
  return (
      <div className={styles['container']}>
        <label className={styles['label']} htmlFor={id}>{label}</label>
        <input className={styles['input-field']} type={type || 'text'} id={id} name={id} placeholder={placeholder || ''} required={required || false} />
      </div>
  );
};

export default FormTextInput;