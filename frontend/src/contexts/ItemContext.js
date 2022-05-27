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

  const fetchItems = useCallback(async () => {
    setLoading(true);
    let tmp = [
      {
        id: "1",
        image: 'https://www.priceza.com/article/wp-content/uploads/2020/05/iPhone-11-Pro-Max-cover.jpg',
        name: "iPhone 11",
        status: "ส่งคืนแล้ว",
        tag: "t1",
        foundPlace: "โรงอาหารคณะไอที",
        returnPlace: "ห้องกิจการนักศึกษา ตึกคณะไอที",
        description: "วางอยู่บนโต๊ะใกล้ร้านพี่ช้าง",
      },
      {
        id: "2",
        image: 'https://proreview.co/wp-content/uploads/2021/06/Apple-MacBook-Air-13-inch.jpg',
        name: "Notebook",
        status: "ส่งคืนแล้ว",
        tag: "t6",
        foundPlace: "โรงอาหารคณะไอที",
        returnPlace: "ห้องกิจการนักศึกษา ตึกคณะไอที",
        description: "วางอยู่บนโต๊ะใกล้ร้านพี่ช้าง",
      },
      {
        id: "3",
        image: 'https://www.investireoggi.it/tech/wp-content/uploads/sites/14/2019/05/Galaxy-Fold-che-fine-hai-fatto.jpg',
        name: "Samsung Galaxy Fold",
        status: "ยังไม่พบเจ้าของ",
        tag: "t1",
        foundPlace: "โรงอาหารคณะไอที",
        returnPlace: "ห้องกิจการนักศึกษา ตึกคณะไอที",
        description: "วางอยู่บนโต๊ะใกล้ร้านพี่ช้าง",
      },
      {
        id: "4",
        image: 'https://cf.shopee.co.th/file/67f2ea383c746b7bebb3e291ffaf9f2e',
        name: "หูฟังสีชมพู",
        status: "ยังไม่พบเจ้าของ",
        tag: "t5",
        foundPlace: "โรงอาหารคณะไอที",
        returnPlace: "ห้องกิจการนักศึกษา ตึกคณะไอที",
        description: "วางอยู่บนโต๊ะใกล้ร้านพี่ช้าง",
      },
      {
        id: "5",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/AirPods.jpg/1200px-AirPods.jpg',
        name: "Airpod",
        status: "ยังไม่พบเจ้าของ",
        tag: "t5",
        foundPlace: "โรงอาหารคณะไอที",
        returnPlace: "ห้องกิจการนักศึกษา ตึกคณะไอที",
        description: "วางอยู่บนโต๊ะใกล้ร้านพี่ช้าง",
      },
    ];
    await setItems(tmp);
    setLoading(false);
  }, []);

  const addItem = useCallback(
    async (item) => {
      setItems((prev) => [...prev, {
        id: (items.length+1).toString(),
        image: item.image,
        name: item.name,
        status: "ยังไม่พบเจ้าของ",
        tag: item.type,
        foundPlace: item.found_place,
        returnPlace: item.pick_place,
        description: item.item_detail,
      }]);
      await searchItem();
      console.log(items);
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

  const returnItem = useCallback(
    async (id) => {
      let tmp = items.forEach((item) => {
        if(item.id === id){
          item.status = 'ส่งคืนแล้ว'
        }
      })
      await setItems(tmp)
      await displayItem(id)
    },
    []
  );

  const removeItem = useCallback(
    (id) => {
      let tmp = items.filter((item) => {return item.id !== id})
      setItems(tmp);
    },
    [items]
  );

  const selectedStatus = useCallback((id, status) => {
    id === "1" ? setFound(status) : setLost(status);
  });

  const selectedType = useCallback(async (id, status) => {
    if (status) {
      await setTypes((prev) => [...prev, id]);
    } else {
      await setTypes(() => types.filter((type_id) => type_id !== id));
    }
  });

  const filterStatus = async () => {
    let tmp = [];

    if (found && lost) {
      await setListItem(() => items);
    } else if (found) {
      tmp = listItem.filter((item) => item.status === "ส่งคืนแล้ว");
      await setListItem(tmp);
    } else if (lost) {
      tmp = listItem.filter((item) => item.status === "ยังไม่พบเจ้าของ");
      await setListItem(tmp);
    } else {
      await setListItem(() => items);
    }
  };

  const searchItem = useCallback(
    async (text) => {
      let tmp = [];

      if (!found && !lost && types.length === 0 && !text) {
        await setListItem(items);
        return;
      }

      if (types) {
        tmp = items.filter((item) => types.includes(item.tag));
        await setListItem(tmp);
      }
      if (found || lost) {
        filterStatus();
      }

      if (text) {
        tmp = listItem.filter((item) =>
          item.name.toLowerCase().includes(text.toLowerCase())
        );
        await setListItem(tmp);
      }
    },
    [items, listItem, found, lost, types, addItem]
  );

  const displayItem = useCallback(async (id) => {
    await items.forEach((item) => {
      if (item.id === id) {
        setSelectedItem(item);
      }
    });
  });

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
      returnItem,
    }),
    [
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
      returnItem,
    ]
  );

  useEffect(() => {
    fetchItems();
    searchItem();
  }, [found, lost, types]);

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export const useItem = () => useContext(ItemContext);
