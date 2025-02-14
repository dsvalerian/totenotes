import styles from './nav-item.module.css';

interface NavItemProps {
  label: string,
  selected: boolean
}

const NavItem = ({label, selected}: NavItemProps) => {
  return (
      <li className={styles['nav-item']}>
        {label}
      </li>
  );
};

export default NavItem;