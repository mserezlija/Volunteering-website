import { useContext, useState, useEffect } from "react";
import useFetchVolunteers from "../useFetchVolunteers";
import { Volunteer } from "../../Interfaces";
import { AdminContext } from "../../../Admin/AdminContext";
import FilterVolunteers from "../FilterVolunteers";
import AddVolunteer from "../AddVolunteers/AddVolunteers";
import EditVolunteer from "../EditVolunteers/EditVolunteers";
import styles from "./Volunteers.module.css";

const Volunteers: React.FC = () => {
  const { isAdmin } = useContext(AdminContext);
  const {
    data: volunteers,
    deleteVolunteer,
    updateVolunteer,
  } = useFetchVolunteers("volunteers");
  const [filteredVolunteers, setFilteredVolunteers] =
    useState<Volunteer[]>(volunteers);

  useEffect(() => {
    setFilteredVolunteers(volunteers);
  }, [volunteers]);

  const applyFilters = (cityFilter: string, jobTypeFilter: string) => {
    let filtered: Volunteer[] = volunteers;
    if (cityFilter) {
      filtered = filtered.filter((volunteer) => volunteer.city === cityFilter);
    }
    if (jobTypeFilter) {
      filtered = filtered.filter(
        (volunteer) => volunteer.jobType === jobTypeFilter
      );
    }
    setFilteredVolunteers(filtered);
  };

  const handleDeleteVolunteer = (id: string) => {
    deleteVolunteer(id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Volunteers Page</h1>
      {isAdmin && (
        <div className="mb-3">
          <AddVolunteer />
        </div>
      )}
      <FilterVolunteers volunteers={volunteers} applyFilters={applyFilters} />
      <div className={styles.row}>
        {filteredVolunteers.map((volunteer: Volunteer) => (
          <div key={volunteer.id} className={styles.card}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{volunteer.name}</h5>
                <p className="card-text">City: {volunteer.city}</p>
                <p className="card-text">Job: {volunteer.jobType}</p>
                {isAdmin && (
                  <div className={styles.actions}>
                    <EditVolunteer
                      volunteer={volunteer}
                      updateVolunteer={updateVolunteer}
                    />
                    <button
                      className={`btn ${styles.deleteButton}`}
                      onClick={() => handleDeleteVolunteer(volunteer.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Volunteers;
