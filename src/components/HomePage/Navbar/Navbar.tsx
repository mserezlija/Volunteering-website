import { useContext } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../../Admin/AdminContext";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);

  const handleAdminToggle = () => {
    setIsAdmin((prevState) => !prevState);
  };

  return (
    <nav className={`navbar navbar-light navbar-expand ${styles.navbar}`}>
      <div className="container-fluid">
        <Link className={`navbar-brand ${styles.brand}`} to="/">
          Logo
        </Link>
        <div className={`navbar-nav me-auto ${styles.nav}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${styles.link}`} to="/">
                <button className={`btn ${styles.linkBtn}`}>Home</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.link}`} to="/activities">
                <button className={`btn ${styles.linkBtn}`}>Activities</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.link}`} to="/volunteers">
                <button className={`btn ${styles.linkBtn}`}>Volunteers</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.link}`} to="/organizations">
                <button className={`btn ${styles.linkBtn}`}>
                  Organizations
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className={`form-check-input ${styles.checkbox}`}
            id="adminCheck"
            checked={isAdmin}
            onChange={handleAdminToggle}
          />
          <label
            className={`form-check-label ${styles.label}`}
            htmlFor="adminCheck"
          >
            Admin
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
