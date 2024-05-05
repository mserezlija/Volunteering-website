import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../Admin/AdminContext";

const Navbar: React.FC = () => {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);

  const handleAdminToggle = () => {
    setIsAdmin((prevState) => !prevState);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Your Logo
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/activities">
                Activities
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/volunteers">
                Volunteers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/organizations">
                Organizations
              </Link>
            </li>
          </ul>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="adminCheck"
              checked={isAdmin}
              onChange={handleAdminToggle}
            />
            <label className="form-check-label" htmlFor="adminCheck">
              Admin
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
