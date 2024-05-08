import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Volunteer } from "../../Interfaces";
import styles from "./AddVolunteers.module.css";

const AddVolunteers: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Volunteer>>({
    name: "",
    city: "",
    jobType: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.city || !formData.jobType) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const newVolunteer: Volunteer = {
        id: `volunteer_${Date.now()}`,
        name: formData.name!,
        city: formData.city!,
        jobType: formData.jobType!,
      };

      await axios.post("http://localhost:5000/volunteers", newVolunteer);
      console.log("Added new volunteer:", newVolunteer);
      setFormData({
        name: "",
        city: "",
        jobType: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding volunteer:", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add New Volunteer
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Volunteer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <label className={styles.formLabel}>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </label>
            <label className={styles.formLabel}>
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </label>
            <label className={styles.formLabel}>
              Job Type:
              <input
                type="text"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </label>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button
              variant="primary"
              type="submit"
              className={styles.formButton}
            >
              Add Volunteer
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddVolunteers;
