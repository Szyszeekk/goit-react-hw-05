import { NavLink } from "react-router-dom";
import css from "../css/Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? css.activeLink : css.link)}>
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? css.activeLink : css.link)}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
