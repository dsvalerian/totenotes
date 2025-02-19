import styles from "./home-page-layout.module.css";
import HomePageNav from "../home-page-nav/home-page-nav.tsx";
import ShoppingList from "../shopping-list/shopping-list.tsx";
import SelectedShoppingListProvider from "../../contexts/selected-shopping-list-provider.tsx";

const HomePageLayout = () => {
  return (
      <div className={styles["layout"]}>
        <SelectedShoppingListProvider>
          <HomePageNav title={"Shopping Lists"} user={"username@example.com"} />
          <div className={styles["page-content"]}>
            <ShoppingList />
          </div>
        </SelectedShoppingListProvider>
      </div>
  );
};

export default HomePageLayout;