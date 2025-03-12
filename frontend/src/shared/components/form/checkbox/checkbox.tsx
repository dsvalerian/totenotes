import styles from "./checkbox.module.css";

interface CheckboxProps {
  id: string,
  label?: string,
  scale?: number,
  onClick?: () => void,
  checked?: boolean
}

const Checkbox = ({id, label, scale, onClick, checked}: CheckboxProps) => {
  return (
      <div className={styles["wrapper"]}>
        <input
            className={styles["checkbox"]}
            type={"checkbox"}
            id={id}
            style={{transform: `scale(${scale || 1})`}}
            onChange={onClick}
            checked={checked || false}
        />
        {label && <label className={styles["label"]} htmlFor={id}>{label}</label>}
      </div>
  );
};

export default Checkbox;