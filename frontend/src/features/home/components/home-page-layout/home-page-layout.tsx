import styles from "./home-page-layout.module.css";
import HomePageNav from "../home-page-nav/home-page-nav.tsx";
import ShoppingListContainer from "../shopping-list-container/shopping-list-container.tsx";
import SelectedShoppingListProvider from "../../providers/selected-shopping-list-provider.tsx";

const HomePageLayout = () => {
  return (
      <div className={styles["layout"]}>
        <SelectedShoppingListProvider>
          <HomePageNav />
          <div className={styles["page-content"]}>
            <ShoppingListContainer />
          </div>
        </SelectedShoppingListProvider>
      </div>
  );
};

export default HomePageLayout;