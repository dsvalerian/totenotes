import styles from './form.module.css';
import {PropsWithChildren} from 'react';

const AuthForm = ({children}: PropsWithChildren) => {
  return (
      <form className={styles['form']}>
        {children}
      </form>
  );
};

export default AuthForm;