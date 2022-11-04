import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CommentIcon from "@mui/icons-material/Comment";
import { IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { MyCompanyListContext } from "../../context/MyCompanyListContext";
import { NoteContext } from "../../context/NoteContext";
import Axios from "../../utilities/Axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

export default function NoteModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [noteInput, setNoteInput] = React.useState([]);

  const { myNote, setMyNote, setIsMyNoteDataLoading } = useContext(NoteContext);
  const { companyId } = useContext(MyCompanyListContext);

  const onChangeInput = (e) => {
    setNoteInput(e.target.value);
  };

  const onClickIAddNote = async () => {
    setIsMyNoteDataLoading(true);
    const response = await Axios.post("/save-note", {
      note: noteInput,
      savedCompanyId: companyId,
    });
    setMyNote(response.data);
    setIsMyNoteDataLoading(false);
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
              <AddIcon fontSize="large" color="primary" onClick={onClickIAddNote}></AddIcon>
            </IconButton>
          </Box>
          <Box>
            {myNote.map((x, index) => (
              <Box
                key={index}
                sx={{
                  padding: "10px",
                  margin: "10px 1px 1px 1px",
                  borderRadius: "10px",
                  backgroundColor: "#eeeeee",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography key={index} variant="body2" color="#616161">{x.note}</Typography>
                <IconButton onClick={async () => {
                  // when note is deleted, update myNote state variable to be most recent;
                  setIsMyNoteDataLoading(true);
                  await Axios.post("/delete-note", {
                    savedCompanyId: companyId,
                    note: x.note,
                  });
                  setIsMyNoteDataLoading(false);
                }}
                >
                  <DeleteIcon></DeleteIcon>
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
