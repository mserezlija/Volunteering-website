import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import styles from "./SignUpOrganization.module.css";

const SignupOrganization: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/pending-requests", formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          address: "",
          city: "",
          description: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Error submitting organization:", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Sign up new organization
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up new organization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitted ? (
            <div className="alert alert-success" role="alert">
              Your organization request has been sent for approval. Thank you!
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.inputField}>
                <label className="form-label">Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputField}>
                <label className="form-label">Address:</label>
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputField}>
                <label className="form-label">City:</label>
                <input
                  className="form-control"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button variant="primary" type="submit">
                Submit new organization
              </Button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignupOrganization;
