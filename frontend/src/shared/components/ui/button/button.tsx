import styles from './button.module.css';
import {Link} from 'react-router-dom';

interface CommonButtonProps {
  label: string,
  variant?: 'solid' | 'outline'
}

type ConditionalButtonProps = | {
  type?: 'normal' | 'form',
  to?: never
} | {
  type: 'route-link',
  to: string
};

type ButtonProps = CommonButtonProps & ConditionalButtonProps;

const Button = ({label, variant, type, to}: ButtonProps) => {
  const classNames = `${styles['button']} ${styles[variant || 'solid']}`;

  switch (type || 'normal') {
    case 'normal':
      return (
          <input className={classNames} value={label} type={'submit'} />
      );
    case 'form':
      return (
          <button className={classNames}>
            {label}
          </button>
      );
    case 'route-link':
      return (
          <Link className={`${classNames} ${styles['link']}`} to={to || '/'}>{label}</Link>
      );
  }
};

export default Button;