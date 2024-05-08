import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Activity } from "../../Interfaces";
import styles from "./SignUpActivity.module.css";

interface SignUpFormProps {
  activityId: string;
  selectedActivity: Activity | null;
  updateActivity: (updatedActivity: Activity) => void;
}

const SignUpActivity: React.FC<SignUpFormProps> = ({
  activityId,
  selectedActivity,
  updateActivity,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    try {
      const updatedParticipants = [
        ...(selectedActivity?.participants ?? []),
        name,
      ];

      const updatedActivity = {
        ...selectedActivity!,
        participants: updatedParticipants,
      };

      await axios.patch(
        `http://localhost:5000/activities/${activityId}`,
        updatedActivity
      );

      updateActivity(updatedActivity);

      console.log(`Signed up ${name} for activity ${activityId}`);
      setName("");
      setError("");
      setShowModal(false);
      alert("You've successfully signed up!");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        className={styles.signUpButton}
      >
        Sign Up
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>
            Sign Up for Activity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputField}>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                placeholder="Please enter your full name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpActivity;
