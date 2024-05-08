import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Activity } from "../../Interfaces";
import styles from "./AddActivity.module.css";

const AddActivity: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Activity>>({
    name: "",
    organizer: "",
    description: "",
    location: "",
    participants: [],
  });
  const [participantInput, setParticipantInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleParticipantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParticipantInput(e.target.value);
  };

  const addParticipant = () => {
    if (participantInput.trim() === "") {
      setError("Please enter participant name.");
      return;
    }
    setFormData({
      ...formData,
      participants: [...formData.participants!, participantInput.trim()],
    });
    setParticipantInput("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.organizer ||
      !formData.description ||
      !formData.location
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const newActivity: Activity = {
        id: `activity_${Date.now()}`,
        name: formData.name!,
        organizer: formData.organizer!,
        description: formData.description!,
        location: formData.location!,
        participants: formData.participants!,
      };

      await axios.post("http://localhost:5000/activities", newActivity);
      console.log("Added new activity:", newActivity);
      setFormData({
        name: "",
        organizer: "",
        description: "",
        location: "",
        participants: [],
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        className={styles.formButton}
        onClick={() => setShowModal(true)}
      >
        Add new activity
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <label className={styles.formLabel}>
              Name:
              <input
                className={styles.formInput}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className={styles.formLabel}>
              Organizer:
              <input
                className={styles.formInput}
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                required
              />
            </label>
            <label className={styles.formLabel}>
              Description:
              <input
                className={styles.formInput}
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </label>
            <label className={styles.formLabel}>
              Location:
              <input
                className={styles.formInput}
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </label>
            <div>
              <label className={styles.formLabel}>
                Participants:
                <input
                  className={styles.formInput}
                  type="text"
                  value={participantInput}
                  onChange={handleParticipantChange}
                  required
                />
                <Button className={styles.formButton} onClick={addParticipant}>
                  Add Participant
                </Button>
              </label>
            </div>
            {formData.participants && formData.participants.length > 0 && (
              <div>
                <p className={styles.formLabel}>Participants:</p>
                <ul>
                  {formData.participants.map((participant, index) => (
                    <li key={index}>{participant}</li>
                  ))}
                </ul>
              </div>
            )}
            {error && <p className={styles["error"]}>{error}</p>}
            <Button className={styles.formButton} type="submit">
              Add Activity
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddActivity;
