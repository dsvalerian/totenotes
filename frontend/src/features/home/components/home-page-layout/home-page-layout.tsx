import styles from "./home-page-layout.module.css";
import HomePageNav from "../home-page-nav/home-page-nav.tsx";
import ListContainer from "../list-container/list-container.tsx";
import SelectedListProvider from "../../providers/selected-list-provider.tsx";

const HomePageLayout = () => {
  return (
      <div className={styles["layout"]}>
        <SelectedListProvider>
          <HomePageNav />
          <div className={styles["page-content"]}>
            <ListContainer />
          </div>
        </SelectedListProvider>
      </div>
  );
};

export default HomePageLayout;