import { Link } from "react-router-dom";

const Organizations: React.FC = () => {
  return (
    <div>
      <h1>Organizations Page</h1>
      <Link to="/organizations/add">Add New Organization</Link>
    </div>
  );
};

export default Organizations;
