import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Typography } from "@mui/material";
import { useType } from "../contexts/TypeContext";
import { grey } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from '@mui/material/RadioGroup';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useItem } from "../contexts/ItemContext";
import { useEffect } from "react";
import { styled } from '@mui/material/styles';

function Edit() {
  const { types } = useType();
  const { selectedItem, updateItem } = useItem();
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState({
    name: selectedItem.name,
    image: selectedItem.image,
    type: selectedItem.tag,
    found_place: selectedItem.foundPlace,
    item_detail: selectedItem.description,
    pick_place: selectedItem.returnPlace,
  });
  const [upImg, setUpImg] = useState(false);

  const Input = styled('input')({
    display: 'none',
  });

  const handleNameChange = (event) => {
    setNewItem((prev) => ({...prev, name: event.target.value}))
  };

  const handlePlaceChange = (event) => {
    setNewItem((prev) => ({...prev, found_place: event.target.value}))
  };

  const handleDetailChange = (event) => {
    setNewItem((prev) => ({...prev, item_detail: event.target.value}))
  };

  const handlePickPlaceChange = (event) => {
    setNewItem((prev) => ({...prev, pick_place: event.target.value}))
  };

  const handleTypeChange = (event) => {
    setNewItem((prev) => ({...prev, type: event.target.value}))
  };

  const handleSelectImage = async (event) => {
    const file = event.target.files[0]

    let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setNewItem((prev) => ({...prev, image: e.target.result}))
            setUpImg(true)
        }
  };

  const editItem = () => {
    updateItem(newItem);
    navigate("/detail")
  }

  useEffect(() => {
    console.log(newItem);
  },
  [newItem])

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ p: 5, bgcolor: "#eceff1" }}
    >
      <Grid item xs={6} sx={{ px: 2, py: 4, bgcolor: "#fafafa" }}>
        <Typography variant="h4">แจ้งของหาย</Typography>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={2} sx={{ py: 1 }}>
            <Typography variant="h6">ชื่อ</Typography>
          </Grid>
          <Grid item xs={10}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="name"
                label="สิ่งที่พบ"
                value={newItem.name}
                variant="outlined"
                onChange={handleNameChange}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={2} sx={{ py: 1 }}>
            <Typography variant="h6">หมวดหมู่</Typography>
          </Grid>
          <Grid item xs={10}>
          <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={newItem.type}
                name="radio-buttons-group"
            >
              <Grid container>
                {types.map((type, index) => (
                  <Grid xs={4}>
                    <FormControlLabel
                      key={type.id}
                      control={
                        <Radio
                          id={type.id}
                          value={type.id}
                          onChange={handleTypeChange}
                          sx={{
                            color: grey[800],
                            "&.Mui-checked": {
                              color: grey[600],
                            },
                          }}
                        />
                      }
                      label={type.name}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={2} sx={{ py: 1 }}>
            <Typography variant="h6">สถานที่ที่พบ</Typography>
          </Grid>
          <Grid item xs={10}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="found-place"
                label="สถานที่"
                value={newItem.found_place}
                variant="outlined"
                onChange={handlePlaceChange}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={2} sx={{ py: 1 }}>
            <Typography variant="h6">รายละเอียด</Typography>
          </Grid>
          <Grid item xs={10}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="detail"
                label="รายละเอียดของสิ่งที่พบ"
                value={newItem.item_detail}
                variant="outlined"
                onChange={handleDetailChange}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={2} sx={{ py: 1 }}>
            <Typography variant="h6">สถานที่รับคืน</Typography>
          </Grid>
          <Grid item xs={10}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="pick-place"
                label="สถานที่ติดต่อรับคืน"
                value={newItem.pick_place}
                variant="outlined"
                defaultValue="ห้องกิจการนักศึกษา ตึกคณะไอที"
                onChange={handlePickPlaceChange}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={2} sx={{ py: 1 }}>
            <Typography variant="h6">รูปภาพ</Typography>
          </Grid>
          <Grid item xs={10}>
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleSelectImage}/>
              <Button variant="outlined" component="span">
                Upload
              </Button>
            </label>
            <Typography variant=" subtitle1" sx={{m: 1}}>{upImg ? "อัพโหลดรูปภาพแล้ว" : "ยังไม่ได้อัพโหลดรูปภาพ"}</Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            p: 1,
            m: 1,
            borderRadius: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{ m: 1, width: "10%", bgcolor: "#00bfa5" }}
            onClick={editItem}
          >
            ยืนยัน
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1, width: "10%", bgcolor: "#ff0000" }}
            onClick={() => navigate("/detail")}
          >
            ยกเลิก
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Edit;
