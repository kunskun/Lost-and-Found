import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from '@mui/material';

export const ItemCard = ({ item }) => {
  
  return (
    <Card sx={{ height: '100%', width: "100%", bgcolor: "#efebe9" }} onClick={() => localStorage.setItem('item', item.id)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="130"
          width="100%"
          image={item.image}
          alt={item.name}
          sx={{}}
        />
        <CardContent sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{color: item.status === 'ส่งคืนแล้ว' ? '#00bfa5':'#ff0000'}} >
            {item.status}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
