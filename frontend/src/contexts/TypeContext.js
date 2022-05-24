import { useCallback } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";

export const TypeContext = createContext();

export const TypeProvider = ({ children }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = useCallback(() => {
    setTypes(() => [
      "มือถือ",
      "กระเป๋า",
      "กุญแจ",
      "ปากกา",
      "หูฟัง",
    ]);
  });

  const addType = useCallback(
    (type) => {
      setTypes((prev) => [...prev, type]);
      console.log(types);
    },
    [types]
  );
  const updateType = useCallback(
    (index) => (text) => () => {
      setTypes((prev) => {
        const type = prev[index];
        const newType = {
          ...type,
          text,
        };
        return [...prev.slice(0, index), newType, ...prev.slice(index + 1)];
      });
    },
    []
  );
  const removeType = useCallback(
    (index) => () => {
      setTypes((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    },
    []
  );
  const value = useMemo(
    () => ({
      types,
      addType,
      updateType,
      removeType,
    }),
    [types, addType, updateType, removeType]
  );
  return <TypeContext.Provider value={value}>{children}</TypeContext.Provider>;
};

export const useType = () => useContext(TypeContext);
