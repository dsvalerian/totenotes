import styles from './shopping-item.module.css';

interface ShoppingItemProps {
  item: string,
  amount: number,
  unit: string
}

const ShoppingItem = ({item, amount, unit}: ShoppingItemProps) => {
  return (
      <li className={styles['shopping-item']}>
        <p>{amount} {unit}</p>
        <p>{item}</p>
      </li>
  );
};

export default ShoppingItem;