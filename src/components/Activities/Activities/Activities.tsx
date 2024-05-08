import { useContext, useState } from "react";
import useData from "../fetchActivities";
import { AdminContext } from "../../../Admin/AdminContext";
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import AddActivity from "../AddActivity/AddActivity";
import { Activity } from "../../Interfaces";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./Activities.module.css";

const Activities: React.FC = () => {
  const { isAdmin } = useContext(AdminContext);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    data: activities,
    deleteActivity,
    updateActivity,
  } = useData("activities");

  const handleDeleteActivity = (id: string) => {
    deleteActivity(id);
    handleCloseModal();
  };

  const handleViewDetails = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedActivity(null);
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Activities Page</h1>
      <AddActivity />
      <div className={styles.row}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.card}>
            <Card>
              <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.cardTitle}>
                  {activity.name}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                  Organizer: {activity.organizer}
                </Card.Text>
                <Button
                  variant="primary"
                  className={`mr-2 ${styles.viewButton}`}
                  onClick={() => handleViewDetails(activity)}
                >
                  View Details
                </Button>
                {isAdmin && (
                  <Button
                    variant="danger"
                    className={`mr-2 ${styles.deleteButton}`}
                    onClick={() => handleDeleteActivity(activity.id)}
                  >
                    Delete Activity
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      {selectedActivity && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <ActivityDetails
            activity={selectedActivity}
            onClose={handleCloseModal}
            isAdmin={isAdmin}
            updateActivity={updateActivity}
          />
        </Modal>
      )}
    </div>
  );
};

export default Activities;
