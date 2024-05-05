import { useContext, useState, useEffect } from "react";
import useFetchVolunteers from "./useFetchVolunteers";
import { Volunteer } from "../Interfaces";
import { AdminContext } from "../../Admin/AdminContext";
import FilterVolunteers from "./FilterVolunteers";
import AddVolunteer from "./AddVolunteers";
import EditVolunteer from "./EditVolunteers";

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
    <div className="container">
      <h1 className="mt-5 mb-4">Volunteers Page</h1>
      {isAdmin && (
        <div className="mb-3">
          <AddVolunteer />
        </div>
      )}
      <FilterVolunteers volunteers={volunteers} applyFilters={applyFilters} />
      <div className="row">
        {filteredVolunteers.map((volunteer: Volunteer) => (
          <div key={volunteer.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{volunteer.name}</h5>
                <p className="card-text">City: {volunteer.city}</p>
                <p className="card-text">Job: {volunteer.jobType}</p>
                {isAdmin && (
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteVolunteer(volunteer.id)}
                    >
                      Delete
                    </button>
                    <EditVolunteer
                      volunteer={volunteer}
                      updateVolunteer={updateVolunteer}
                    />
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
