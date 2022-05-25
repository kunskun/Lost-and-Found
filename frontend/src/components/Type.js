import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useType } from "../contexts/TypeContext";

export default function CheckboxTypes() {
  const { types, updateType } = useType();

  const handleChange = (event) => {
    updateType(event.target.id);
    console.log(event.target.id);
  };

  // const seleted = (id) => {
  //   types.forEach((type) => {
  //     if (type.id.toString() === id) {
  //       type.checked = !type.checked;
  //       console.log(type);
  //     }
  //   });
  // };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ display: { xs: "none", sm: "block", fontWeight: "bold" } }}
      >
        หมวดหมู่
      </Typography>
      <FormGroup>
        {types.map((type) => (
          <FormControlLabel
          key={type.id}
          control={
            <Checkbox
              id={type.id}
              checked={type.checked}
              onChange={handleChange}
            />
          }
          label={type.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
