import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useItem } from "../contexts/ItemContext";

export default function CheckboxLabels() {
  const { selectStatus } = useItem();
  const [data, setData] = useState([
    {id: 1, name: 'ส่งคืนแล้ว'},
    {id: 2, name: 'ยังไม่พบเจ้าของ'},
  ])

  const handleChange = (event) => {
    selectStatus(event.target.id, event.target.checked)
    // event.target.id === '1' ? setFound(event.target.checked) : setLost(event.target.checked) 
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
        <FormControlLabel control={<Checkbox id={data[0].id} onChange={handleChange} />} label={data[0].name} />
        <FormControlLabel control={<Checkbox id={data[1].id} onChange={handleChange} />} label={data[1].name} />
      </FormGroup>
    </Box>
  );
}
