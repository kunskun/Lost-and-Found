import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useItem } from "../contexts/ItemContext";
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

export const ReturnDialog = (item) => {
  const [open, setOpen] = React.useState(false);
  const {returnItem} = useItem();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [editPose, { data, loading, error }] = useMutation(EDIT_POSE);

  const confirmChang = async() => {
    await editPose({
      variables: {
        id: item.item._id,
        name: item.item.name,
        img: item.item.image,
        status: "ส่งคืนแล้ว",
        tag: item.item.tag,
        foundPlace: item.item.foundPlace,
        returnPlace: item.item.returnPlace,
        description: item.item.description
      }
    })
    returnItem(item.item.id)
    setOpen(false);
  }

  if(item.item.status === 'ส่งคืนแล้ว') 
  return(
    <div>
        <Button
            disabled
            variant="contained"
            sx={{ m: 1, width: "100%", bgcolor: "#673ab7" }}
        >
            ยืนยันการขอคืน
        </Button>
    </div>
  )
  return (
    <div>
      <Button
        variant="contained"
        sx={{ m: 1, width: "100%", bgcolor: "#673ab7" }}
        onClick={handleClickOpen}
      >
        ยืนยันการขอคืน
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ยืนยันที่จะคืน " + item.item.name + " ใช่หรือไม่"}
        </DialogTitle>
        <DialogActions>
          <Button sx={{color: '#ff0000'}} onClick={handleClose}>ยกเลิก</Button>
          <Button sx={{color: '#00bfa5'}} onClick={confirmChang} autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReturnDialog;
