import styles from './form.module.css';
import {FormEventHandler, PropsWithChildren} from 'react';

interface FormProps {
  onSubmit: FormEventHandler<HTMLFormElement>
}

const AuthForm = ({onSubmit, children}: PropsWithChildren<FormProps>) => {
  return (
      <form className={styles['form']} onSubmit={onSubmit}>
        {children}
      </form>
  );
};

export default AuthForm;