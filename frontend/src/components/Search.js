import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import { useItem } from "../contexts/ItemContext";
import { useState } from "react";
import { useEffect } from "react";

export default function SearchBox() {
  const { items, searchItem } = useItem();
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
    searchItem(event.target.value)
  };

  useEffect(() => {
    searchItem()
  },
  [items])


  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", maxWidth: "100%" }}>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel
          htmlFor="search-input"
          sx={{
            color: "#ffffff",
          }}
        >
          Search
        </InputLabel>
        <OutlinedInput
          id="search-input"
          value={text}
          onChange={handleChange}
          endAdornment={
            <InputAdornment
              position="end"
              sx={{
                color: "#ffffff",
              }}
            >
              <SearchIcon />
            </InputAdornment>
          }
          label="Search"
          sx={{
            color: "#ffffff",
            bgcolor: "#3e2723",
          }}
        />
      </FormControl>
    </Box>
  );
}
