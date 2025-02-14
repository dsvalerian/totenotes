import styles from './home-page-nav.module.css';
import NavItem from '../nav-item/nav-item.tsx';
import Button from '../../../../shared/components/ui/button/button.tsx';
import {PropsWithChildren} from 'react';

type HomePageNavProps = {
  title: string,
  user: string
} | PropsWithChildren;

const HomePageNav = ({title, user, children}: HomePageNavProps) => {
  return (
      <nav className={styles['nav']}>
        <div className={styles['top-nav']}>
          <h2 className={styles['title']}>{title}</h2>
          <ul className={styles['item-list']}>
            {children}
            <Button type={'normal'} label={'New List'} />
            <NavItem label={'Settings'} selected={false} />
          </ul>
        </div>
        <p className={styles['footer']}>{user}</p>
      </nav>
  );
};

export default HomePageNav;