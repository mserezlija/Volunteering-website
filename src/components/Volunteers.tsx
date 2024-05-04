import React from "react";
import { useAppContext } from "../pages/AppContext";
import { Volunteer } from "./dataService";

const Volunteers: React.FC = () => {
  const { data } = useAppContext();

  return (
    <div>
      <h1>Volunteers Page</h1>
      <ul>
        {data?.volunteers.map((volunteer: Volunteer) => (
          <li key={volunteer.id}>
            <strong>Name:</strong> {volunteer.name}
            <br />
            <strong>City:</strong> {volunteer.city}
            <br />
            <strong>Job Type:</strong> {volunteer.jobType}
            <br />
            <strong>Rating:</strong> {volunteer.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Volunteers;
