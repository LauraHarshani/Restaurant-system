import { createContext, useContext, useState, useEffect } from "react";
import { chefs as initialChefs } from "../data/mockData";

const ChefContext = createContext();

export function ChefProvider({ children }) {
  const [chefs, setChefs] = useState(() => {
    const saved = localStorage.getItem("flame_chefs_v2");
    return saved ? JSON.parse(saved) : initialChefs;
  });

  useEffect(() => {
    localStorage.setItem("flame_chefs_v2", JSON.stringify(chefs));
  }, [chefs]);

  const updateChef = (updatedChef) => { setChefs(chefs.map(c => c.id === updatedChef.id ? updatedChef : c)); };
  const addChef = (newChef) => { setChefs([...chefs, { ...newChef, id: Date.now() }]); };
  const deleteChef = (id) => { setChefs(chefs.filter(c => c.id !== id)); };

  return <ChefContext.Provider value={{ chefs, updateChef, addChef, deleteChef }}>{children}</ChefContext.Provider>;
}

export function useChefs() { return useContext(ChefContext); }
