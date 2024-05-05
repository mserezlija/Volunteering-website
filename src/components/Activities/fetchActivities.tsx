import { useState, useEffect } from "react";
import axios from "axios";
import { Activity } from "../Interfaces";

const useFetchActivities = (resource: string) => {
  const [data, setData] = useState<Activity[]>([]);

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

  const deleteActivity = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/${resource}/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const updateActivity = async (updatedActivity: Activity) => {
    try {
      await axios.put(
        `http://localhost:5000/${resource}/${updatedActivity.id}`,
        updatedActivity
      );
      setData(
        data.map((item) =>
          item.id === updatedActivity.id ? updatedActivity : item
        )
      );
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  return { data, deleteActivity, updateActivity };
};

export default useFetchActivities;
