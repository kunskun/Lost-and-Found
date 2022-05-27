import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useItem } from "../contexts/ItemContext";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";

const DELETE_POSE = gql`mutation ($pose_id: String!){
  deletePose(id: $pose_id){
    _id
  }
}
`

export const DeleteDialog = (item) => {
  const [open, setOpen] = React.useState(false);
  const {removeItem} = useItem();
  const navigate = useNavigate();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [delPose, { data, loading, error }] = useMutation(DELETE_POSE);

  const confirmDel = async () => {
    console.log(item.item._id);
    await delPose({
      variables: { pose_id: item.item._id }
    })
    removeItem(item.item._id);
    navigate("/")
    setOpen(false);
  }

  return (
    <div style={{display: 'flex'}}>
      <IconButton
            size="large"
            edge="end"
            aria-label="delete item"
            aria-haspopup="true"
            onClick={handleClickOpen}
            color="inherit"
        >
            <DeleteTwoToneIcon fontSize="28" />
        </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ยืนยันที่จะลบ " + item.item.name + " ใช่หรือไม่"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button sx={{color: '#ff0000'}} onClick={confirmDel} autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
