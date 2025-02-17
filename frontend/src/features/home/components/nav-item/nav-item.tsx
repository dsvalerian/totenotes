import styles from './nav-item.module.css';

interface NavItemProps {
  label: string,
  selected: boolean,
  onClick?: () => void
}

const NavItem = ({label, selected, onClick}: NavItemProps) => {
  return (
      <li className={`${styles['nav-item']} ${selected && styles['selected']}`} onClick={onClick}>
        {label}
      </li>
  );
};

export default NavItem;