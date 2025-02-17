import styles from "./auth-side-panel.module.css";
import {PropsWithChildren} from "react";

const AuthSidePanel = ({children}: PropsWithChildren) => {
  return (
      <section className={styles["panel"]}>
        <div className={styles["content"]}>
          {children}
        </div>
      </section>
  );
};

export default AuthSidePanel;