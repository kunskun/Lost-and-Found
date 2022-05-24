import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";

export default function BasicTextFields() {
  const [values, setValues] = React.useState({
    text: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
          value={values.text}
          onChange={handleChange("text")}
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
            bgcolor: "#212121",
          }}
        />
      </FormControl>
    </Box>
  );
}
