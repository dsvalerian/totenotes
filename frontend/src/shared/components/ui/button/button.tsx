import styles from './button.module.css';

type ButtonProps = {
  text: string,
  variant?: 'normal' | 'outline';
};

const Button = ({text, variant}: ButtonProps) => {
  return (
      <button className={`${styles['button']} ${styles[variant || 'normal']}`}>
        {text}
      </button>
  );
};

export default Button;