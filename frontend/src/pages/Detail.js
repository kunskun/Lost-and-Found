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
  }, [id]);

  return (

        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ p: 5 }}>
          <Grid item xs={6}>
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
                width="90%"
                src="https://us.123rf.com/450wm/koblizeek/koblizeek1902/koblizeek190200055/125337077-no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-.jpg?ver=6"
                alt="pic name"
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
