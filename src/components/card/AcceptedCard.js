import {
  Box, Button, Card, FormControl, IconButton, InputLabel, MenuItem, Select, Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import { MyCompanyListContext } from "../../context/MyCompanyListContext";
import NoteModal from "../modal/NoteModal";
import Axios from "../../utilities/Axios";
import { NoteContext } from "../../context/NoteContext";

function AcceptedCard() {
  const {
    myCompanyList,
    setMyCompanyList,
    setCompanyId,
    setIsMyCompanyDataLoading,
  } = useContext(MyCompanyListContext);

  const { setIsMyNoteDataLoading } = useContext(NoteContext);

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

  const [joblicationStatus, setJoblicationStatus] = useState("");

  return (
    <>
      {myCompanyList.filter((watchList) => (
        watchList.joblicationStatus === "accepted"
      )).map((list, index) => (
        <Card
          key={index}
          sx={{
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
            <Button onClick={() => {
              // when the note button is clicked, ;
              // then update the note state variable
              // after .01 sec to the latest note
              setIsMyNoteDataLoading(true);
              setCompanyId(list._id);
              setTimeout(() => {
                setIsMyNoteDataLoading(false);
              }, 100);
            }}
            >
              <NoteModal></NoteModal>
            </Button>
            <IconButton onClick={() => deleteCompany(list._id)}>
              <DeleteIcon color="primary"></DeleteIcon>
            </IconButton>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small" variant="standard">
                <InputLabel id="demo-simple-select-label"><Typography color="primary">Move</Typography></InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={joblicationStatus}
                  label="Move"
                  onChange={async (event) => {
                    const { value } = event.target;
                    setJoblicationStatus(value);
                    const response = await Axios.post("/joblication-status", {
                      companyId: list._id,
                      joblicationStatus: value,
                    });
                    setMyCompanyList(response.data.message);
                    // I need to filter joblicationstatus
                  }}
                >
                  <MenuItem value="watch">Watch</MenuItem>
                  <MenuItem value="applied">Applied</MenuItem>
                  <MenuItem value="interview">Interview</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Card>
      ))}
    </>
  );
}

export default AcceptedCard;
