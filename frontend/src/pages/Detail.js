import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useItem } from "../contexts/ItemContext";
import { useLogin } from "../contexts/LoginContext";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

function Detail() {
  const { selectedItem, displayItem, removeItem } = useItem();
  const [id, setId] = useState("");
  const { admin } = useLogin();
  const navigate = useNavigate();

  const handleDelOpen = () => {
    removeItem(id);
    navigate("/")
  }

  const edit = (
    <IconButton
      size="large"
      edge="end"
      aria-label="edit item"
      aria-haspopup="true"
      // onClick={handleMenuOpen}
      color="inherit"
    >
      <EditTwoToneIcon fontSize="28" />
    </IconButton>
  );

  const del = (
    <IconButton
      size="large"
      edge="end"
      aria-label="delete item"
      aria-haspopup="true"
      onClick={handleDelOpen}
      color="inherit"
    >
      <DeleteTwoToneIcon fontSize="28" />
    </IconButton>
  );


  useEffect(() => {
    const local = localStorage.getItem("item");
    setId(local)
    displayItem(id);
  }, [displayItem, id, admin]);

  return (

        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ p: 5, bgcolor: '#eceff1' }}>
          <Grid item xs={6} sx={{px: 2, py: 4, bgcolor: '#fafafa'}}>
            <Grid container >
              <Grid item sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h4"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block", fontWeight: "bold" } }}
                >
                  {selectedItem.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h4"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block", fontWeight: "bold" } }}
                >
                  {admin && edit}
                  {admin && del}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body2" sx={{color: selectedItem.status === 'ส่งคืนแล้ว' ? '#00bfa5':'#ff0000'}}>
                {selectedItem.status}
            </Typography>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              width="100%"
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
