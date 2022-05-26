import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useItem } from "../contexts/ItemContext";

function Detail() {
  const { selectedItem, displayItem } = useItem();
  const [id, setId] = useState("");

  useEffect(() => {
    const local = localStorage.getItem("item");
    setId(local)
    displayItem(id);
  }, [displayItem, id]);

  return (

        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ p: 5, bgcolor: '#eceff1' }}>
          <Grid item xs={6} sx={{px: 2, py: 4, bgcolor: '#fafafa'}}>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block", fontWeight: "bold" } }}
            >
              {selectedItem.name}
            </Typography>
            <Typography variant="body2" sx={{color: selectedItem.status === 'ส่งคืนแล้ว' ? '#00bfa5':'#ff0000'}}>
                {selectedItem.status}
            </Typography>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              width="80%"
              style={{
                margin: '2% auto',
                display: 'flex',
                alignItems: 'center'
              }}
            />
            <Typography variant="h6" fontWeight='bold'>
                สถานที่รับคืน
            </Typography>
            <Typography variant="subtitle1">
                {selectedItem.returnPlace}
            </Typography>
            <Typography variant="h6" fontWeight='bold'>
                สถานที่ที่พบ
            </Typography>
            <Typography variant="subtitle1">
                {selectedItem.foundPlace}
            </Typography>
            <Typography variant="h6" fontWeight='bold'>
                รายละเอียด
            </Typography>
            <Typography variant="subtitle1">
                {selectedItem.description}
            </Typography>
          </Grid>
        </Grid>

  );
}

export default Detail;
