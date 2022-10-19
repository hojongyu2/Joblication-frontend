import {
  Box, Card, IconButton, Typography,
} from "@mui/material";
import { useContext } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import CircleIcon from "@mui/icons-material/Circle";
import { MyCompanyListContext } from "../../context/MyCompanyListContext";
import NoteModal from "../modal/NoteModal";

function SavedJobCard() {
  const { myCompanyList } = useContext(MyCompanyListContext);

  return (
    <>
      {myCompanyList.map((list) => (
        <Card sx={{
          color: "white", padding: "10px", margin: "10px", borderRadius: "10px",
        }}
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
            <IconButton>
              <NoteModal></NoteModal>
            </IconButton>
          </Box>
        </Card>
      ))}
    </>
  );
}

export default SavedJobCard;
