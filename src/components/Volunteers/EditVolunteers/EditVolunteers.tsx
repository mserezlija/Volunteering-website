import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Volunteer } from "../../Interfaces";
import styles from "./EditVolunteers.module.css";

interface Props {
  volunteer: Volunteer;
  updateVolunteer: (updatedVolunteer: Volunteer) => Promise<void>;
}

const EditVolunteer: React.FC<Props> = ({ volunteer, updateVolunteer }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: volunteer.name,
    city: volunteer.city,
    jobType: volunteer.jobType,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateVolunteer({
        ...volunteer,
        name: formData.name,
        city: formData.city,
        jobType: formData.jobType,
      });
      console.log("Volunteer updated successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating volunteer:", error);
    }
  };

  return (
    <>
      <Button
        className={`${styles.editButton} ml-2`}
        onClick={() => setShowModal(true)}
      >
        Edit
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>
            Edit Volunteer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <form onSubmit={handleSubmit}>
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
            <Button
              variant="primary"
              type="submit"
              className={styles.formButton}
            >
              Update Volunteer
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditVolunteer;
