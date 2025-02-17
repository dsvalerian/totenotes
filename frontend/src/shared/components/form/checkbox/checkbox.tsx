import styles from "./checkbox.module.css";

interface CheckboxProps {
  id: string,
  label: string
}

const Checkbox = ({id, label}: CheckboxProps) => {
  return (
      <div className={styles["wrapper"]}>
        <input className={styles["checkbox"]} type={"checkbox"} id={id} />
        <label className={styles["label"]} htmlFor={id}>{label}</label>
      </div>
  );
};

export default Checkbox;