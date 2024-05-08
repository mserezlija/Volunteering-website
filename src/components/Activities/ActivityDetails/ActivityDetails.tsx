import Button from "react-bootstrap/Button";
import { Activity } from "../../Interfaces";
import SignUpActivity from "../SignUpActivity/SignUpActivity";
import styles from "./ActivityDetails.module.css";

const ActivityDetails: React.FC<{
  activity: Activity;
  onClose: () => void;
  isAdmin: boolean;
  updateActivity: (updatedActivity: Activity) => void;
}> = ({ activity, onClose, isAdmin, updateActivity }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{activity.name}</h1>
      <p className={styles.text}>Organizer: {activity.organizer}</p>
      <p className={styles.text}>Description: {activity.description}</p>
      <p className={styles.text}>Location: {activity.location}</p>
      <div className={styles.participants}>
        <p className={styles.text}>
          Participants: {activity.participants.join(", ")}
        </p>
        <div>
          {!isAdmin && (
            <SignUpActivity
              activityId={activity.id}
              selectedActivity={activity}
              updateActivity={updateActivity}
            />
          )}
          <Button variant="danger" type="submit" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
