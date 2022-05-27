import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Grid, Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import { useLogin } from "../contexts/LoginContext";

export const ItemCard = ({ item }) => {
  const { admin } = useLogin();

  return (
    <Card
      sx={{ height: "100%", width: "100%", bgcolor: "#efebe9" }}
      onClick={() => localStorage.setItem("item", item.id)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="130"
          width="100%"
          image={item.image}
          alt={item.name}
        />
        <CardContent
          sx={{ justifyContent: "flex-end", alignItems: "flex-end" }}
        >

              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>

          <Typography
            variant="body2"
            sx={{ color: item.status === "ส่งคืนแล้ว" ? "#00bfa5" : "#ff0000" }}
          >
            {item.status}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
