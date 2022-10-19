import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CommentIcon from "@mui/icons-material/Comment";
import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { MyCompanyListContext } from "../../context/MyCompanyListContext";
import { NoteContext } from "../../context/NoteContext";
import Axios from "../../utilities/Axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NoteModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [noteInput, setNoteInput] = React.useState([]);

  const { myNote, setMyNote } = useContext(NoteContext);
  const { myCompanyList } = useContext(MyCompanyListContext);

  const onChangeInput = (e) => {
    setNoteInput(e.target.value);
  };
 
  const onClickIkon = async () => {
    const response = await Axios.post("/save-note", {
      note: noteInput,
      savedCompanyId: myCompanyList.savedCompanyId,
    });
    console.log(response);
  };

  return (
    <div>
      <Button onClick={handleOpen}><CommentIcon></CommentIcon></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Note
          </Typography>
          <Box display="flex">
            <TextField onChange={onChangeInput} label="Your Note here" variant="standard" fullWidth />
            <IconButton>
              <AddIcon fontSize="large" color="primary" onClick={onClickIkon}></AddIcon>
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
