import {PropsWithChildren} from 'react';
import styles from './auth-layout.module.css';

const AuthLayout = ({children}: PropsWithChildren) => {
  return (
      <div className={styles['auth-layout']}>
        <article className={styles['main-panel']}>
          {children}
        </article>
      </div>
  );
};

export default AuthLayout;