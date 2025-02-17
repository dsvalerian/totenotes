import styles from './home-page-layout.module.css';
import HomePageNav from '../home-page-nav/home-page-nav.tsx';
import NavItem from '../nav-item/nav-item.tsx';
import ShoppingList from '../shopping-list/shopping-list.tsx';
import ShoppingItem from '../shopping-item/shopping-item.tsx';

const HomePageLayout = () => {
  return (
      <div className={styles['layout']}>
        <HomePageNav title={'Shopping Lists'} user={'username@example.com'}>
          <NavItem key={'nav-1'} label={'Groceries'} selected={false} />
          <NavItem key={'nav-2'}  label={'Amazon'} selected={false} />
          <NavItem key={'nav-3'}  label={'Pharmacy'} selected={false} />
        </HomePageNav>
        <ShoppingList>
          <ShoppingItem item={'Cereal'} amount={1} unit={''} />
          <ShoppingItem item={'Sugar'} amount={2} unit={'lb'} />
          <ShoppingItem item={'Milk'} amount={1} unit={'gallon'} />
        </ShoppingList>
      </div>
  );
};

export default HomePageLayout;