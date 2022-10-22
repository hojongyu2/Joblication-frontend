import {
  Box, Button, Card, IconButton, Typography,
} from "@mui/material";
import { useContext } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import { MyCompanyListContext } from "../../context/MyCompanyListContext";
import NoteModal from "../modal/NoteModal";
import Axios from "../../utilities/Axios";
// import { NoteContext } from "../../context/NoteContext";

function SavedJobCard() {
  const {
    myCompanyList,
    setCompanyId,
    setIsMyCompanyDataLoading,
  } = useContext(MyCompanyListContext);

  // const { setIsMyNoteDataLoading } = useContext(NoteContext);

  const deleteCompany = async (element) => {
    const response = await Axios.post("/delete-company", {
      savedCompanyId: element,
    });
    // console.log(response.data);
    if (response.data === true) {
      setIsMyCompanyDataLoading(true);
      setTimeout(() => {
        setIsMyCompanyDataLoading(false);
      }, 100);
    } else {
      setIsMyCompanyDataLoading(true);
      setTimeout(() => {
        setIsMyCompanyDataLoading(false);
      }, 100);
    }
  };
  return (
    <>
      {myCompanyList.map((list, index) => (
        <Card
          key={index}
          sx={{
            color: "white", padding: "10px", margin: "10px", borderRadius: "10px", cursor: "move",
          }}
          draggable
        >
          <Typography sx={{ color: "black", fontSize: "20px", display: "inline-flex" }}>
            <CircleIcon sx={{ width: "8px", marginRight: "5px" }} />
            {list.jobTitle}
          </Typography>
          <Typography sx={{
            color: "black", fontSize: "15px", display: "inline-flex", marginRight: "5px",
          }}
          >
            <CircleIcon sx={{ width: "8px", marginRight: "5px" }} />
            {list.company}
          </Typography>
          <Typography sx={{ color: "black", fontSize: "15px", display: "inline-flex" }}>
            <CircleIcon sx={{ width: "8px", marginRight: "5px" }} />
            {list.location}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <IconButton onClick={() => window.open(list.url)}>
              <LaunchIcon color="primary" />
            </IconButton>
            <Button onClick={() => (setCompanyId(list._id))}>
              <NoteModal></NoteModal>
            </Button>
            <IconButton onClick={() => deleteCompany(list._id)}>
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </Box>
        </Card>
      ))}
    </>
  );
}

export default SavedJobCard;
