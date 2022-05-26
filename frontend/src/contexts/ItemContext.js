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
  const [types, setTypes] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  const fetchItems = useCallback(
    async () => {
      setLoading(true)
      let tmp = [
        { id: '1', name: "iPhone 11", status: "ส่งคืนแล้ว", tag: 't1', 'foundPlace': 'โรงอาหารคณะไอที', 'returnPlace': 'ห้องกิจการนักศึกษา ตึกคณะไอที', 'description': 'วางอยู่บนโต๊ะใกล้ร้านพี่ช้าง' },
        { id: '2', name: "Notebook", status: "ส่งคืนแล้ว", tag: 't6', 'foundPlace': 'โรงอาหารคณะไอที', 'returnPlace': 'ห้องกิจการนักศึกษา ตึกคณะไอที', 'description': 'วางอยู่บนโต๊ะใกล้ร้านพี่ช้าง' },
        { id: '3', name: "Samsung", status: "ยังไม่พบเจ้าของ", tag: 't1', 'foundPlace': 'โรงอาหารคณะไอที', 'returnPlace': 'ห้องกิจการนักศึกษา ตึกคณะไอที', 'description': 'วางอยู่บนโต๊ะใกล้ร้านพี่ช้าง' },
        { id: '4', name: "หูฟังสีชมพู", status: "ยังไม่พบเจ้าของ", tag: 't5', 'foundPlace': 'โรงอาหารคณะไอที', 'returnPlace': 'ห้องกิจการนักศึกษา ตึกคณะไอที', 'description': 'วางอยู่บนโต๊ะใกล้ร้านพี่ช้าง' },
      ]
      await setItems(tmp);
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

  const selectedStatus = useCallback(
    (id, status) => {
      id === '1' ? setFound(status) : setLost(status) 
    }
  );

  const selectedType = useCallback(
    async(id, status) => {
      if (status){
        await setTypes((prev) => [...prev, id])
      } else {
        await setTypes(() => types.filter((type_id) => type_id !== id))
      }
    }
  )

  const filterStatus = async () => {
    let tmp = []

    if(found && lost){
      await setListItem(() => items)
    }
    else if(found) {
      tmp = listItem.filter((item) => item.status === 'ส่งคืนแล้ว')
      await setListItem(tmp)
    }
    else if(lost) {
      tmp = listItem.filter((item) => item.status === 'ยังไม่พบเจ้าของ')
      await setListItem(tmp)
    }
    else {
      await setListItem(() => items)
    }
  }

  const searchItem = useCallback(
    async (text) => {
        let tmp = []

        if(!found && !lost && types.length === 0 && !text){
          await setListItem(items)
          return;
        } 
            
        if(types) {
          tmp = items.filter((item) => types.includes(item.tag))
          await setListItem(tmp)
        } 
        if(found || lost) {
          filterStatus()
        }

        if(text) {
          tmp = listItem.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))
          await setListItem(tmp)
        }
      
    },
    [items, listItem, found, lost, types, addItem]
  );

  const displayItem = useCallback(
    async(id) => {
      await items.filter((item) => {
        if(item.id === id){
          setSelectedItem(item)
        }
      })
    }
  );

  const value = useMemo(
    () => ({
      items, 
      displayItem,
      selectedItem,
      selectedStatus, 
      selectedType,
      listItem,
      searchItem,
      addItem,
      updateItem,
      removeItem,
    }),
    [items, displayItem, selectedItem, selectedStatus, selectedType, listItem, searchItem, addItem, updateItem, removeItem]
  );

  useEffect(() => {
    fetchItems();
    searchItem();
  }, [found, lost, types]);

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export const useItem = () => useContext(ItemContext);
