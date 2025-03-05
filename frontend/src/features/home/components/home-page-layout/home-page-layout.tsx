import styles from "./home-page-layout.module.css";
import HomePageNav from "../home-page-nav/home-page-nav.tsx";
import ShoppingListContainer from "../shopping-list-container/shopping-list-container.tsx";
import SelectedListProvider from "../../providers/selected-list-provider.tsx";

const HomePageLayout = () => {
  return (
      <div className={styles["layout"]}>
        <SelectedListProvider>
          <HomePageNav />
          <div className={styles["page-content"]}>
            <ShoppingListContainer />
          </div>
        </SelectedListProvider>
      </div>
  );
};

export default HomePageLayout;