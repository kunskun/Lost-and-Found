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
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";

const EDIT_POSE = gql`
  mutation EditPose (
    $id: String!,
    $name: String!,
    $img: String!,
    $status: String!,
    $tag: String!,
    $foundPlace: String!,
    $returnPlace: String!,
    $description: String!,
    ) {
    editPose(
      id: $id,
      name: $name,
      image: $img,
      status: $status,
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

  const [editPose, { data, loading, error }] = useMutation(EDIT_POSE);

  const editItem = async() => {
    await editPose({
      variables: {
        id: selectedItem._id,
        name: newItem.name,
        img: newItem.image,
        status: selectedItem.status,
        tag: newItem.type,
        foundPlace: newItem.found_place,
        returnPlace: newItem.pick_place,
        description: newItem.item_detail
      }
    })
    updateItem(newItem);
    navigate("/detail")
  }

  useEffect(() => {

  },
  [newItem])

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
        <Typography variant="h4">??????????????????????????????</Typography>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={2} sx={{ py: 1 }}>
            <Typography variant="h6">????????????</Typography>
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
                label="???????????????????????????"
                value={newItem.name}
                variant="outlined"
                onChange={handleNameChange}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={2} sx={{ py: 1 }}>
            <Typography variant="h6">????????????????????????</Typography>
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
            <Typography variant="h6">????????????????????????????????????</Typography>
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
                label="?????????????????????"
                value={newItem.found_place}
                variant="outlined"
                onChange={handlePlaceChange}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={2} sx={{ py: 1 }}>
            <Typography variant="h6">??????????????????????????????</Typography>
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
                label="??????????????????????????????????????????????????????????????????"
                value={newItem.item_detail}
                variant="outlined"
                onChange={handleDetailChange}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={2} sx={{ py: 1 }}>
            <Typography variant="h6">???????????????????????????????????????</Typography>
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
                label="?????????????????????????????????????????????????????????"
                value={newItem.pick_place}
                variant="outlined"
                defaultValue="?????????????????????????????????????????????????????? ??????????????????????????????"
                onChange={handlePickPlaceChange}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={2} sx={{ py: 1 }}>
            <Typography variant="h6">??????????????????</Typography>
          </Grid>
          <Grid item xs={10}>
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleSelectImage}/>
              <Button variant="outlined" component="span">
                Upload
              </Button>
            </label>
            <Typography variant=" subtitle1" sx={{m: 1}}>{upImg ? "???????????????????????????????????????????????????" : "??????????????????????????????????????????????????????????????????"}</Typography>
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
            ??????????????????
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1, width: "10%", bgcolor: "#ff0000" }}
            onClick={() => navigate("/detail")}
          >
            ??????????????????
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Edit;
