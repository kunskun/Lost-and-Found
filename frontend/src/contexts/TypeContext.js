import { useCallback } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";

export const TypeContext = createContext();

export const TypeProvider = ({ children }) => {
  const [types, setTypes] = useState([]);

  const fetchTypes = useCallback(() => {
    setTypes(() => [
      {id: 't1', name: "มือถือ", checked: false},
      {id: 't2', name:"กระเป๋า", checked: false},
      {id: 't3', name:"กุญแจ", checked: false},
      {id: 't4', name:"ปากกา", checked: false},
      {id: 't5', name:"หูฟัง", checked: false},
      {id: 't6', name:"โน็ตบุ้ค", checked: false},
    ]);
  },[]);

  const addType = useCallback(
    (type) => {
      setTypes((prev) => [...prev, {id: 't'+(types.length+1), name: type.name, checked: false}]);
    },
    [types]
  );
  
  const updateType = useCallback(
    (id) => {
      setTypes((prev) => {
        const item = types.filter((type) => {
          if(type.id.toString() === id){
            return type
          }
        })
        const index = types.findIndex(type => {
          return type.id.toString() === id
        })
        console.log(index);
        const newType = {
          id: item.id,
          name: item.name,
          checked: !item.checked,
        };
        console.log("test", ...prev.slice(0, index), newType, ...prev.slice(index + 1));
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

  useEffect(() => {
    fetchTypes();
  }, []);

  return <TypeContext.Provider value={value}>{children}</TypeContext.Provider>;
};

export const useType = () => useContext(TypeContext);
