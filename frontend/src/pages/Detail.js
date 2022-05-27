import { Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useItem } from "../contexts/ItemContext";
import { useLogin } from "../contexts/LoginContext";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ReturnDialog from "../components/Dialog";
import DeleteDialog from "../components/DelDialog";

function Detail() {
  const { selectedItem, displayItem, removeItem } = useItem();
  const [id, setId] = useState("");
  const { admin } = useLogin();
  const navigate = useNavigate();

  const Base64ToImg = () => (
    <img
      src={`${selectedItem.image}`}
      alt={selectedItem.name}
      width="100%"
      style={{
        margin: "2% auto",
        display: "flex",
        alignItems: "center",
      }}
    />
  );

  const edit = (
    <IconButton
      size="large"
      edge="end"
      aria-label="edit item"
      aria-haspopup="true"
      onClick={(selectedItem) => navigate("/edit")}
      color="inherit"
    >
      <EditTwoToneIcon fontSize="28" />
    </IconButton>
  );

  useEffect(() => {
    const local = localStorage.getItem("item");
    setId(local);
    displayItem(id);
  }, [displayItem, selectedItem]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ p: 5, bgcolor: "#eceff1" }}
    >
      <Grid item xs={6} sx={{ px: 2, py: 4, bgcolor: "#fafafa" }}>
        <Grid container>
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
          <Grid item xs={2} sx={{ direction: "flex-end" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block", fontWeight: "bold" },
                }}
              >
                {admin && edit}
              </Typography>
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block", fontWeight: "bold" },
                }}
              >
                {admin && <DeleteDialog item={selectedItem} />}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          sx={{
            color: selectedItem.status === "ส่งคืนแล้ว" ? "#00bfa5" : "#ff0000",
          }}
        >
          {selectedItem.status}
        </Typography>
        <Base64ToImg data={selectedItem.image} />
        <Typography variant="h6" fontWeight="bold">
          สถานที่รับคืน
        </Typography>
        <Typography variant="subtitle1">{selectedItem.returnPlace}</Typography>
        <Typography variant="h6" fontWeight="bold">
          สถานที่ที่พบ
        </Typography>
        <Typography variant="subtitle1">{selectedItem.foundPlace}</Typography>
        <Typography variant="h6" fontWeight="bold">
          รายละเอียด
        </Typography>
        <Typography variant="subtitle1">{selectedItem.description}</Typography>
        {admin ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              p: 1,
              m: 1,
              borderRadius: 1,
            }}
          >
            <ReturnDialog item={selectedItem} />
          </Box>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default Detail;
