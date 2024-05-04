import axios, { AxiosResponse } from "axios";

export interface Activity {
  id: string;
  name: string;
  date: string;
  organizer: string;
  description: string;
  location: string;
  participants: [];
}

export interface Volunteer {
  id: string;
  name: string;
  city: string;
  jobType: string;
  rating: number;
}

export interface Organization {
  id: string;
  name: string;
  address: string;
  city: string;
  description: string;
}

export interface Data {
  activities: Activity[];
  volunteers: Volunteer[];
  organizations: Organization[];
}

export async function fetchData(endpoint: string): Promise<Data> {
  try {
    const response: AxiosResponse<Data> = await axios.get(
      `http://localhost:5000/${endpoint}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
