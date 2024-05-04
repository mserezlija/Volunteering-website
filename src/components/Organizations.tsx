import React from "react";
import { useAppContext } from "../pages/AppContext";
import { Organization } from "./dataService";

const Organizations: React.FC = () => {
  const { data } = useAppContext();

  return (
    <div>
      <h1>Organizations Page</h1>
      <ul>
        {data?.organizations.map((org: Organization) => (
          <li key={org.id}>
            <strong>Name:</strong> {org.name}
            <br />
            <strong>Address:</strong> {org.address}
            <br />
            <strong>City:</strong> {org.city}
            <br />
            <strong>Description:</strong> {org.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Organizations;
