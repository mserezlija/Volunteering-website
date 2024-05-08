import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Organization } from "../../Interfaces";
import { AdminContext } from "../../../Admin/AdminContext";
import styles from "./PendingOrganizations.module.css";

const PendingOrganizations: React.FC = () => {
  const { isAdmin } = useContext(AdminContext);
  const [pendingRequests, setPendingRequests] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pending-requests"
        );
        setPendingRequests(response.data);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      }
    };
    fetchPendingRequests();
  }, []);

  const handleAction = async (id: string, action: string) => {
    try {
      if (action === "approve") {
        const orgToApprove = pendingRequests.find((org) => org.id === id);
        if (!orgToApprove) {
          console.error("Organization not found for approval");
          return;
        }
        await axios.post("http://localhost:5000/organizations", orgToApprove);
      }
      await axios.delete(`http://localhost:5000/pending-requests/${id}`);
      setPendingRequests(pendingRequests.filter((org) => org.id !== id));
    } catch (error) {
      console.error(
        `Error ${action === "approve" ? "approving" : "rejecting"} request:`,
        error
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2>Pending Organization Requests</h2>
      <ul className={styles["list-group"]}>
        {pendingRequests.map((org) => (
          <li key={org.id} className={styles["list-group-item"]}>
            <div className={styles.name}>{org.name}</div>
            <div className={styles.address}>
              {org.address}, {org.city}
            </div>
            {isAdmin && (
              <div className={styles["action-buttons"]}>
                <button
                  className={`btn btn-success ${styles["action-btn"]}`}
                  onClick={() => handleAction(org.id, "approve")}
                >
                  Approve
                </button>
                <button
                  className={`btn btn-danger ${styles["action-btn"]}`}
                  onClick={() => handleAction(org.id, "reject")}
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingOrganizations;
