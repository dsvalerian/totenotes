import {PropsWithChildren} from 'react';
import styles from './auth-layout.module.css';

const AuthLayout = ({children}: PropsWithChildren) => {
  return (
      <div className={styles['auth-layout']}>
        {children}
      </div>
  );
};

export default AuthLayout;