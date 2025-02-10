import styles from './button.module.css';
import {Link} from 'react-router-dom';

interface CommonButtonProps {
  text: string,
  variant?: 'solid' | 'outline',
}

type ConditionalButtonProps = | {
  type?: 'normal' | 'form',
  to?: never
} | {
  type: 'route-link',
  to: string
};

type ButtonProps = CommonButtonProps & ConditionalButtonProps;

const Button = ({text, variant, type, to}: ButtonProps) => {
  const classNames = `${styles['button']} ${styles[variant || 'solid']}`;

  switch (type || 'normal') {
    case 'normal':
      return (
          <input className={classNames} value={text} type={'submit'} />
      );
    case 'form':
      return (
          <button className={classNames}>
            {text}
          </button>
      );
    case 'route-link':
      return (
          <Link className={`${classNames} ${styles['link']}`} to={to || '/'}>{text}</Link>
      );
  }
};

export default Button;