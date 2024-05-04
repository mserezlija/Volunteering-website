import React from "react";
import { useAppContext } from "../pages/AppContext";
import { Activity } from "./dataService";

const Activities: React.FC = () => {
  const { data } = useAppContext();

  return (
    <div>
      <h1>Activities Page</h1>
      <ul>
        {data?.activities.map((activity: Activity) => (
          <li key={activity.id}>
            <strong>Name:</strong> {activity.name}
            <br />
            <strong>Date:</strong> {activity.date}
            <br />
            <strong>Organizer:</strong> {activity.organizer}
            <br />
            <strong>Description:</strong> {activity.description}
            <br />
            <strong>Location:</strong> {activity.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;
