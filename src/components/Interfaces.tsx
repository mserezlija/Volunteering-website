export interface User {
  id: string;
  name: string;
}

export interface Activity {
  id: string;
  name: string;
  organizer: string;
  description: string;
  location: string;
  participants: string[];
}

export interface Volunteer {
  id: string;
  name: string;
  city: string;
  jobType: string;
}

export interface Organization {
  id: string;
  name: string;
  address: string;
  city: string;
}
