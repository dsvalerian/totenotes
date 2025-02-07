import styles from './button.module.css';

type ButtonProps = {
  text: string,
  variant?: 'solid' | 'outline',
  form?: boolean,
};

const Button = ({text, variant, form}: ButtonProps) => {
  if (form) {
    return (
      <input className={`${styles['button']} ${styles[variant || 'solid']}`} value={text} type={'submit'} />
    );
  }
  else {
    return (
        <button className={`${styles['button']} ${styles[variant || 'solid']}`}>
          {text}
        </button>
    );
  }

};

export default Button;