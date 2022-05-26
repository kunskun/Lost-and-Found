import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { brown } from "@mui/material/colors";
import { useType } from "../contexts/TypeContext";
import { useItem } from "../contexts/ItemContext";

export default function CheckboxTypes() {
  const { selectedType } = useItem();
  const { types } = useType();

  const handleChange = (event) => {
    selectedType(event.target.id, event.target.checked);
  };

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
        {types.map((type, index) => (
          <FormControlLabel
            key={type.id}
            sx={{bgcolor: index%2 === 0 ? '#efebe9' : '#fafafa'}}
            control={
              <Checkbox
                id={type.id}
                onChange={handleChange}
                sx={{
                  color: brown[800],
                  "&.Mui-checked": {
                    color: brown[600],
                  },
                }}
              />
            }
            label={type.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
