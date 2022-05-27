import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useItem } from "../contexts/ItemContext";

export const ReturnDialog = (item) => {
  const [open, setOpen] = React.useState(false);
  const {returnItem} = useItem();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmChang = () => {
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
