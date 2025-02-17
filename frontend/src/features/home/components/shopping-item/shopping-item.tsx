import styles from './shopping-item.module.css';

interface ShoppingItemProps {
  name: string,
  quantity: number,
  quantityUnit?: string
}

const ShoppingItem = ({name, quantity, quantityUnit}: ShoppingItemProps) => {
  return (
      <li className={styles['shopping-item']}>
        <p>{quantity}{quantityUnit && ` ${quantityUnit}`}</p>
        <p>{name}</p>
      </li>
  );
};

export default ShoppingItem;