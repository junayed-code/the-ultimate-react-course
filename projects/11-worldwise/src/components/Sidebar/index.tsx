import { NavLink, Outlet } from "react-router-dom";

import Logo from "@components/Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <SidebarNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

function SidebarNav() {
  return (
    <nav className={styles.sidebarNav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Counties</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
