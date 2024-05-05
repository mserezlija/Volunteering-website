import { useState, useEffect } from "react";
import axios from "axios";
import { Volunteer } from "../Interfaces";

const useFetchVolunteers = (resource: string) => {
  const [data, setData] = useState<Volunteer[]>([]);

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

  const deleteVolunteer = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/${resource}/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting volunteer:", error);
    }
  };

  const updateVolunteer = async (updatedVolunteer: Volunteer) => {
    try {
      await axios.put(
        `http://localhost:5000/${resource}/${updatedVolunteer.id}`,
        updatedVolunteer
      );
      setData(
        data.map((item) =>
          item.id === updatedVolunteer.id ? updatedVolunteer : item
        )
      );
    } catch (error) {
      console.error("Error updating volunteer:", error);
    }
  };

  return { data, deleteVolunteer, updateVolunteer };
};

export default useFetchVolunteers;
