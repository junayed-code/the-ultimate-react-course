import { Outlet, useLocation } from "react-router-dom";

import Navbar from "@components/Navbar";
import styles from "./BaseLayout.module.css";

function BaseLayout() {
  const { pathname } = useLocation();

  const backgroundImage = {
    ...(pathname.endsWith("/") && {
      backgroundImage: `linear-gradient(rgba(36, 42, 46, 0.8),rgba(36, 42, 46, 0.8)),url("/bg.jpg")`,
    }),
  };

  return (
    <div className={styles.baseLayout} style={{ ...backgroundImage }}>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default BaseLayout;
