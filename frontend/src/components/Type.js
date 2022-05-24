import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useType } from "../contexts/TypeContext";

export default function CheckboxLabels() {
  const { types } = useType()
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
        { types.map((type) => (
          <FormControlLabel control={<Checkbox />} label={type} />
        )) }
      </FormGroup>
    </Box>
  );
}
