import { useCallback } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = useCallback(() => {
    setItems(() => [
      { name: "iPhone 11", status: "ส่งคืนแล้ว" },
      { name: "Notebook", status: "ยังไม่พบเจ้าของ" },
    ]);
  });

  const addItem = useCallback(
    (item) => {
      setItems((prev) => [...prev, { name: item.name, status: item.status }]);
      console.log(items);
    },
    [items]
  );
  const updateItem = useCallback(
    (index) => (amount) => () => {
      setItems((prev) => {
        const item = prev[index];
        const newItem = {
          ...item,
          time: item.time + amount,
        };
        return [...prev.slice(0, index), newItem, ...prev.slice(index + 1)];
      });
    },
    []
  );
  const removeItem = useCallback(
    (index) => () => {
      setItems((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    },
    []
  );
  const value = useMemo(
    () => ({
      items,
      addItem,
      updateItem,
      removeItem,
    }),
    [items, addItem, updateItem, removeItem]
  );
  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export const useItem = () => useContext(ItemContext);
