import { createContext, useContext, useState, useEffect } from "react";
import { chefs as initialChefs } from "../data/mockData";

const ChefContext = createContext();

function loadChefs() {
  const saved = localStorage.getItem("flame_chefs_v2");

  if (!saved) {
    return initialChefs;
  }

  const chefs = JSON.parse(saved);
  const previousMayaImage =
    "https://images.unsplash.com/photo-1583394293214-28a5b42f7a72?w=800";
  const currentMayaImage = initialChefs.find(
    (chef) => chef.id === 2
  ).image;

  return chefs.map((chef) =>
    chef.name === "Maya Fernando" && chef.image === previousMayaImage
      ? { ...chef, image: currentMayaImage }
      : chef
  );
}

export function ChefProvider({ children }) {
  const [chefs, setChefs] = useState(loadChefs);

  useEffect(() => {
    localStorage.setItem("flame_chefs_v2", JSON.stringify(chefs));
  }, [chefs]);

  const updateChef = (updatedChef) => { setChefs(chefs.map(c => c.id === updatedChef.id ? updatedChef : c)); };
  const addChef = (newChef) => { setChefs([...chefs, { ...newChef, id: Date.now() }]); };
  const deleteChef = (id) => { setChefs(chefs.filter(c => c.id !== id)); };

  return <ChefContext.Provider value={{ chefs, updateChef, addChef, deleteChef }}>{children}</ChefContext.Provider>;
}

export function useChefs() { return useContext(ChefContext); }
