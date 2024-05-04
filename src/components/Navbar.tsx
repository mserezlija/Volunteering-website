import React from "react";
import { useAppContext } from "../pages/AppContext";

const Navbar: React.FC = () => {
  const { userRole, setUserRole } = useAppContext();

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserRole(e.target.checked ? "admin" : "user");
  };

  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/activities">Activities</a>
        </li>
        <li>
          <a href="/volunteers">Volunteers</a>
        </li>
        <li>
          <a href="/organizations">Organizations</a>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={userRole === "admin"}
              onChange={handleRoleChange}
            />
            Admin
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
