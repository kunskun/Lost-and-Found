import { useCallback } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [listItem, setListItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(false);
  const [lost, setLost] = useState(false);

  const fetchItems = useCallback(
    async () => {
      setLoading(true)
      await setItems([
        { id: 1, name: "iPhone 11", status: "ส่งคืนแล้ว", tag: [1] },
        { id: 2, name: "Notebook", status: "ส่งคืนแล้ว", tag: [6] },
        { id: 3, name: "Samsung", status: "ยังไม่พบเจ้าของ", tag: [1] },
        { id: 4, name: "หูฟังสีชมพู", status: "ยังไม่พบเจ้าของ", tag: [5] },
      ]);
      setLoading(false)
    },
    []
  );

  const addItem = useCallback(
    async (item) => {
      setItems((prev) => [...prev, { name: item.name, status: item.status }]);
      await searchItem();
    },
    [items, listItem]
  );

  const updateItem = useCallback(
    (index) => (item) => () => {
      setItems((prev) => {
        const tmp = prev[index];
        const newItem = {
          ...tmp,
          name: item.name,
          status: item.status,
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

  const selectStatus = useCallback(
    (id, status) => {
      id === '1' ? setFound(status) : setLost(status) 
      console.log(id, found, lost);
    }
  );

  const searchItem = useCallback(
    async (text) => {
      if(loading){
        await fetchItems()
      } else {
        console.log("test", lost, found);
        let tmp = []
        if(text) {
          tmp = items.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))
          await setListItem(tmp)
        }
        if(found && lost) {
          await setListItem(() => items)
        }
        else if(found) {
          tmp = items.filter((item) => item.status == 'ส่งคืนแล้ว')
          await setListItem(tmp)
        }
        else if(lost) {
          tmp = items.filter((item) => item.status == 'ยังไม่พบเจ้าของ')
          await setListItem(tmp)
        }
        else {
          await setListItem(() => items)
          console.log("search", items);
        }
      }
    },
    [items, listItem, found, lost, addItem]
  );

  const value = useMemo(
    () => ({
      items,
      selectStatus,
      listItem,
      searchItem,
      addItem,
      updateItem,
      removeItem,
    }),
    [items, selectStatus, listItem, searchItem, addItem, updateItem, removeItem]
  );

  useEffect(() => {
    fetchItems();
    searchItem();
    ;
  }, [found, lost]);

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export const useItem = () => useContext(ItemContext);
