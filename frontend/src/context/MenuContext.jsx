import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MenuContext = createContext();
const API_URL = "http://localhost:5000/api/menu";

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(API_URL);
      setMenuItems(res.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const addDish = async (newDish) => {
    try {
      await axios.post(API_URL, newDish);
      fetchMenu();
    } catch (error) {
      console.error("Error adding dish:", error);
      alert("Dish add karanna bari una: " + error.message);
    }
  };

  const updateDish = async (updatedDish) => {
    try {
      await axios.put(`${API_URL}/${updatedDish.id}`, updatedDish);
      fetchMenu();
    } catch (error) {
      console.error("Error updating dish:", error);
    }
  };

  const deleteDish = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMenu();
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const toggleAvailability = async (id) => {
    const item = menuItems.find((i) => i.id === id);
    if (item) {
      try {
        await axios.put(`${API_URL}/${id}`, { available: !item.available });
        fetchMenu();
      } catch (error) {
        console.error("Error toggling availability:", error);
      }
    }
  };

  return (
    <MenuContext.Provider value={{ menuItems, addDish, updateDish, deleteDish, toggleAvailability }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}