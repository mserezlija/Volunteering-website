import { Link } from "react-router-dom";

const Volunteers: React.FC = () => {
  return (
    <div>
      <h1>Organizations Page</h1>
      <Link to="/volunteers/add">Add New Volunteer</Link>
    </div>
  );
};

export default Volunteers;
