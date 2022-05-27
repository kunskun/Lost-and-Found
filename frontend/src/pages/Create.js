import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from '@mui/material/RadioGroup';
import Radio from "@mui/material/Radio";
import { styled } from '@mui/material/styles';
import { useType } from "../contexts/TypeContext";
import { useItem } from "../contexts/ItemContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";

const ADD_POSE = gql`
  mutation AddPose (
    $name: String!,
    $img: String!,
    $tag: String!,
    $foundPlace: String!,
    $returnPlace: String!,
    $description: String!,
    ) {
    addPose(
      name: $name,
      image: $img,
      status: "ยังไม่พบเจ้าของ",
      tag: $tag,
      foundPlace: $foundPlace,
      returnPlace: $returnPlace,
      description: $description
    ){
      _id
      name
      image
      status
      tag
      foundPlace
      returnPlace
      description
    }
  }`


function Create() {
  const { types } = useType();
  const { addItem } = useItem();
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState({
    name: "",
    image: "",
    type: "",
    found_place: "",
    item_detail: "",
    pick_place: "ห้องกิจการนักศึกษา ตึกคณะไอที",
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

  const [createPose, { data, loading, error }] = useMutation(ADD_POSE);

  const createItem = async() => {
    if(error) console.log(error.message);
    await createPose({
      variables: {
        name: newItem.name,
        img: newItem.image,
        tag: newItem.type,
        foundPlace: newItem.found_place,
        returnPlace: newItem.pick_place,
        description: newItem.item_detail
      }
    }).then(async (res) => {
      console.log(res.data.addPose);
      await addItem(res.data.addPose);
      navigate("/")
      window.location.reload()
    })
  }

  useEffect(() => {

  },
  [newItem, upImg])

  if(loading) return (<h1>Loading...</h1>)
  if(error) return (<h4>error.message</h4>)
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
                defaultValue="female"
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
            <Typography variant=" h6">รูปภาพ</Typography>
          </Grid>
          <Grid item xs={10}>
            <label htmlFor="contained-button-file">
              <Input accept="image/jpeg" id="contained-button-file" multiple type="file" onChange={handleSelectImage}/>
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
            onClick={createItem}
          >
            ยืนยัน
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1, width: "10%", bgcolor: "#ff0000" }}
            onClick={() => navigate("/")}
          >
            ยกเลิก
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Create;
