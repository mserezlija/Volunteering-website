import { useState, useEffect, useContext } from "react";
import useFetchOrganizations from "./fetchOrganizations";
import { Organization } from "../Interfaces";
import { AdminContext } from "../../Admin/AdminContext";
import FilterOrganizations from "./FilterOrganizations";
import SignupOrganization from "./SignUpOrganization";
import PendingOrganizations from "./PendingOrganizations";

const Organizations: React.FC = () => {
  const { isAdmin } = useContext(AdminContext);
  const {
    data: organizations,
    deleteOrganization,
    // updateOrganization,
  } = useFetchOrganizations("organizations");
  const [filteredOrganizations, setFilteredOrganizations] = useState<
    Organization[]
  >([]);

  useEffect(() => {
    if (organizations) {
      setFilteredOrganizations(organizations);
    }
  }, [organizations]);

  const applyFilters = (
    cityFilter: string,
    nameFilter: string,
    addressFilter: string
  ) => {
    if (!organizations) return;
    let filtered: Organization[] = [...organizations];

    if (cityFilter) {
      filtered = filtered.filter(
        (organization) => organization.city === cityFilter
      );
    }

    if (nameFilter) {
      filtered = filtered.filter(
        (organization) => organization.name === nameFilter
      );
    }

    if (addressFilter) {
      filtered = filtered.filter(
        (organization) => organization.address === addressFilter
      );
    }

    setFilteredOrganizations(filtered);
  };

  const handleDeleteOrganization = (id: string) => {
    deleteOrganization(id);
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Organizations Page</h1>
      {!isAdmin && (
        <div className="mb-3">
          <SignupOrganization />
        </div>
      )}
      {isAdmin && (
        <div className="mb-3">
          <PendingOrganizations />
        </div>
      )}
      {isAdmin && <div className="mb-3"></div>}
      <FilterOrganizations
        organizations={organizations || []}
        applyFilters={applyFilters}
      />
      <div className="row">
        {filteredOrganizations.map((organization: Organization) => (
          <div key={organization.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{organization.name}</h5>
                <p className="card-text">Address: {organization.address}</p>
                <p className="card-text">City: {organization.city}</p>
                {isAdmin && (
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteOrganization(organization.id)}
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

export default Organizations;
