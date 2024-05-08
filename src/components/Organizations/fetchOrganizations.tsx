import { useState, useEffect } from "react";
import axios from "axios";
import { Organization } from "../Interfaces";

const useFetchOrganizations = (resource: string) => {
  const [data, setData] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${resource}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [resource]);

  const deleteOrganization = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/${resource}/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  const updateOrganization = async (updatedOrganization: Organization) => {
    try {
      await axios.put(
        `http://localhost:5000/${resource}/${updatedOrganization.id}`,
        updatedOrganization
      );
      setData(
        data.map((item) =>
          item.id === updatedOrganization.id ? updatedOrganization : item
        )
      );
    } catch (error) {
      console.error("Error updating organization:", error);
    }
  };

  return { data, deleteOrganization, updateOrganization };
};

export default useFetchOrganizations;
