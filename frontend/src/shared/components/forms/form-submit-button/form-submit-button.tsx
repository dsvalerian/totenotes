import styles from './form-submit-button.module.css';

type FormSubmitButtonProps = {
  text; string
};

const FormSubmitButton = ({text}: FormSubmitButtonProps) => {
  return (
      <input className={styles['submit']} type={'submit'} value={text} />
  );
};

export default FormSubmitButton;