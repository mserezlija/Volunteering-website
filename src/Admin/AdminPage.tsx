import React from "react";
import useFetchActivities from "../components/Activities/fetchActivities";

const AdminPage: React.FC = () => {
  const { data: users, deleteActivity } = useFetchActivities("users");

  const handleDeleteUser = (id: string) => {
    console.log("Deleting user with ID:", id);
    deleteActivity(id);
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
