import { createContext, useContext, useState, useEffect } from "react";
import { menuItems as initialMenuItems } from "../data/mockData";

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem("flame_menu_v2");
    return saved ? JSON.parse(saved) : initialMenuItems;
  });

  useEffect(() => {
    localStorage.setItem("flame_menu_v2", JSON.stringify(menuItems));
  }, [menuItems]);

  const addDish = (newDish) => { setMenuItems([...menuItems, { ...newDish, id: Date.now() }]); };
  const updateDish = (updatedDish) => { setMenuItems(menuItems.map(item => item.id === updatedDish.id ? updatedDish : item)); };
  const deleteDish = (id) => { setMenuItems(menuItems.filter(item => item.id !== id)); };
  const toggleAvailability = (id) => { setMenuItems(menuItems.map(item => item.id === id ? { ...item, available: !item.available } : item)); };

  return <MenuContext.Provider value={{ menuItems, addDish, updateDish, deleteDish, toggleAvailability }}>{children}</MenuContext.Provider>;
}

export function useMenu() { return useContext(MenuContext); }
