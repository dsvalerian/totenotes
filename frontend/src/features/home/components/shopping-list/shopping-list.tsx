import styles from './shopping-list.module.css';
import {PropsWithChildren} from 'react';
import Button from '../../../../shared/components/ui/button/button.tsx';

const ShoppingList = ({children}: PropsWithChildren) => {
  return (
      <ul className={styles['shopping-list']}>
        {children}
        <div className={styles['button-wrapper']}>
          <Button label={'New Item'} />
        </div>
      </ul>
  );
};

export default ShoppingList;