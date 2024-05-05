import { Activity } from "../Interfaces";
import SignUpForm from "./SignUpForm";

const ActivityDetails: React.FC<{
  activity: Activity;
  onClose: () => void;
  isAdmin: boolean;
  updateActivity: (updatedActivity: Activity) => void;
}> = ({ activity, onClose, isAdmin, updateActivity }) => {
  return (
    <div className="container mt-5">
      <h1>{activity.name}</h1>
      <p>Date: {activity.date}</p>
      <p>Organizer: {activity.organizer}</p>
      <p>Description: {activity.description}</p>
      <p>Location: {activity.location}</p>
      <p>Participants: {activity.participants.join(", ")}</p>
      {!isAdmin && (
        <SignUpForm
          activityId={activity.id}
          selectedActivity={activity}
          updateActivity={updateActivity}
        />
      )}
      <button className="btn btn-secondary" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ActivityDetails;
