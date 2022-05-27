import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { teal, red } from "@mui/material/colors";
import { useState } from "react";
import { useItem } from "../contexts/ItemContext";

export default function CheckboxLabels() {
  const { selectedStatus } = useItem();
  const [data, setData] = useState([
    { id: "1", name: "ส่งคืนแล้ว" },
    { id: "0", name: "ยังไม่พบเจ้าของ" },
  ]);

  const handleChange = (event) => {
    selectedStatus(event.target.id, event.target.checked);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ display: { xs: "none", sm: "block", fontWeight: "bold" } }}
      >
        สถานะ
      </Typography>
      <FormGroup>
        <FormControlLabel
          sx={{bgcolor: '#fafafa'}}
          control={
            <Checkbox
              id={data[0].id}
              onChange={handleChange}
              sx={{
                color: teal[800],
                "&.Mui-checked": {
                  color: teal[600],
                },
              }}
            />
          }
          label={data[0].name}
        />
        <FormControlLabel
          sx={{bgcolor: '#efebe9' }}
          control={
            <Checkbox
              id={data[1].id}
              onChange={handleChange}
              sx={{
                color: red[800],
                "&.Mui-checked": {
                  color: red[600],
                },
              }}
            />
          }
          label={data[1].name}
        />
      </FormGroup>
    </Box>
  );
}
