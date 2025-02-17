import styles from './button.module.css';
import {Link} from 'react-router-dom';

interface CommonButtonProps {
  label: string,
  variant?: 'solid' | 'outline',
}

type ConditionalButtonProps = {
  type?: 'normal',
  to?: never,
  onClick: () => void
} | {
  type: 'form',
  to?: never,
  onClick?: never
} | {
  type: 'route-link',
  to: string,
  onClick?: never
};

type ButtonProps = CommonButtonProps & ConditionalButtonProps;

const Button = ({label, variant, onClick, type, to}: ButtonProps) => {
  const classNames = `${styles['button']} ${styles[variant || 'solid']}`;

  switch (type || 'normal') {
    case 'normal':
      return (
          <button className={classNames} onClick={onClick}>
            {label}
          </button>
      );
    case 'form':
      return (
          <input className={classNames} value={label} type={'submit'} />
      );
    case 'route-link':
      return (
          <Link className={`${classNames} ${styles['link']}`} to={to || '/'}>{label}</Link>
      );
  }
};

export default Button;