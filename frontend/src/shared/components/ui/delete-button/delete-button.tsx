import styles from "./delete-button.module.css";

interface DeleteButtonProps {
  onClick: () => void
}

const DeleteButton = ({onClick}: DeleteButtonProps) => {
  return (
      <button className={styles["button"]} onClick={onClick}>
        <i className={`fa-solid fa-xmark ${styles["icon"]}`} />
      </button>
  );
};

export default DeleteButton;