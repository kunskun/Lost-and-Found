import * as React from "react";
import Card from "@mui/material/Card";
// import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useItem } from "../contexts/ItemContext";
// import { useCallback } from 'react';

export const ItemCard = ({ item }) => {
  const { addItem, items } = useItem();
  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia
        component="img"
        width="90%"
        image="https://us.123rf.com/450wm/koblizeek/koblizeek1902/koblizeek190200055/125337077-no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-.jpg?ver=6"
        alt="pic name"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="#00e676">
          {item.status}
        </Typography>
        {/* <Button
          onClick={() => {
            addItem({ name: "กระเป๋า", status: "ยังไม่พบเจ้าของ" });
            console.log(items);
          }}
        >
          Test
        </Button> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};
