import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ChefContext = createContext();
const API_URL = "http://localhost:5000/api/chefs";

export function ChefProvider({ children }) {
  const [chefs, setChefs] = useState([]);

  const fetchChefs = async () => {
    try {
      const res = await axios.get(API_URL);
      setChefs(res.data);
    } catch (error) {
      console.error("Error fetching chefs:", error);
    }
  };

  useEffect(() => {
    fetchChefs();
  }, []);

  const addChef = async (newChef) => {
    try {
      await axios.post(API_URL, newChef);
      fetchChefs();
    } catch (error) {
      console.error("Error adding chef:", error);
    }
  };

  const updateChef = async (updatedChef) => {
    try {
      await axios.put(`${API_URL}/${updatedChef.id}`, updatedChef);
      fetchChefs();
    } catch (error) {
      console.error("Error updating chef:", error);
    }
  };

  const deleteChef = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchChefs();
    } catch (error) {
      console.error("Error deleting chef:", error);
    }
  };

  return (
    <ChefContext.Provider value={{ chefs, addChef, updateChef, deleteChef }}>
      {children}
    </ChefContext.Provider>
  );
}

export function useChefs() {
  return useContext(ChefContext);
}