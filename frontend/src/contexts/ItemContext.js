import { useCallback } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

export const ItemContext = createContext();

const POSES_QUERY = gql`{
    poses{
        _id
        name
        image
        status
        tag
        foundPlace
        returnPlace
        description
    }
  }
`;

// const ADD_POSE = gql`{

// }`

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [listItem, setListItem] = useState([]);
  const [found, setFound] = useState(false);
  const [lost, setLost] = useState(false);
  const [types, setTypes] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  const { data, loading, error } = useQuery(POSES_QUERY);
  
  const fetchItems = useCallback(async () => {
    console.log(data.poses);
    if(loading) {
      console.log("Loading...");
    }
    else if(error){
      console.log(error);
    } else {
      let tmp = data.poses
      await setItems(tmp);
    }
  }, [items, data]);

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
    async (pose) => {
      let tmp = []
      await items.forEach((item) => {
        if(item.id === selectedItem.id){
          tmp.push({
            id: selectedItem.id,
            image: pose.image,
            name: pose.name,
            status: selectedItem.status,
            tag: pose.type,
            foundPlace: pose.found_place,
            returnPlace: pose.pick_place,
            description: pose.item_detail,
          })
          console.log(item);
        } else {
          tmp.push(item)
        }
      })
      await setItems(tmp);
      await searchItem();
    },
    [items, listItem]
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
    [selectedItem]
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
  }, [fetchItems, found, lost, types]);

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export const useItem = () => useContext(ItemContext);
