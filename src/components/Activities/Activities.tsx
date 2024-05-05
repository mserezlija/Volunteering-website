import { useContext, useState } from "react";
import useData from "./fetchActivities";
import { AdminContext } from "../../Admin/AdminContext";
import ActivityDetails from "./ActivityDetails";
import AddActivity from "./AddActivity";
import { Activity } from "../Interfaces";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
    <div className="container">
      <h1 className="mt-5 mb-4">Activities Page</h1>
      <div className="row">
        {activities.map((activity) => (
          <div key={activity.id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{activity.name}</Card.Title>
                <Card.Text>Date: {activity.date}</Card.Text>
                <Card.Text>Organizer: {activity.organizer}</Card.Text>
                <Button
                  variant="primary"
                  className="mr-2"
                  onClick={() => handleViewDetails(activity)}
                >
                  View Details
                </Button>
                {isAdmin && (
                  <Button
                    variant="danger"
                    className="mr-2"
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
      <AddActivity />
    </div>
  );
};

export default Activities;
