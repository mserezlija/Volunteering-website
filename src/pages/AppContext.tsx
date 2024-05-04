import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchData, Data } from "../components/dataService";

interface AppProviderProps {
  children: React.ReactNode;
}

interface AppContextType {
  data: Data | null;
  fetchData: (endpoint: string) => Promise<void>;
  userRole: string;
  setUserRole: (role: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [data, setData] = useState<Data | null>(null);
  const [userRole, setUserRole] = useState<string>("user");

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const fetchedData = await fetchData("data");
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromApi();
  }, []);

  const fetchDataFromContext = async (endpoint: string) => {
    await fetchData(endpoint);
  };

  return (
    <AppContext.Provider
      value={{ data, fetchData: fetchDataFromContext, userRole, setUserRole }}
    >
      {children}
    </AppContext.Provider>
  );
};
