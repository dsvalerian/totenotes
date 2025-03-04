import styles from "./home-page-nav-item.module.css";

interface NavItemProps {
  label: string,
  selected: boolean,
  onClick?: () => void
}

const HomePageNavItem = ({label, selected, onClick}: NavItemProps) => {
  return (
      <li
          className={`${styles["nav-item"]} ${selected && styles["selected"]}`}
          onClick={onClick}
      >
        <div className={styles["list-label"]}>
          {label}
        </div>
      </li>
  );
};

export default HomePageNavItem;