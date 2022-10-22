import {
  Box, Card, Container, Typography,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import SavedJobCard from "../card/SavedJobCard";
import { SearchContext } from "../../context/SearchContext";

function JoblicationPage() {
  const { pagenatedData } = useContext(SearchContext);
  const navigate = useNavigate();
  return (
    <Layout>
      {pagenatedData && (
        navigate("/")
        // go to main page if search funcionality has been actvated
      )}
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{
          display: "flex", flexDirection: "row", justifyContent: "space-around", marginLeft: "180px",
        }}
        >
          <Typography variant="h5" color="gray" sx={{ minWidth: "275px" }}>watch list</Typography>
          <Typography variant="h5" color="gray" sx={{ minWidth: "275px" }}>applied</Typography>
          <Typography variant="h5" color="gray" sx={{ minWidth: "275px" }}>interview</Typography>
          <Typography variant="h5" color="gray" sx={{ minWidth: "275px" }}>accepted</Typography>
        </Box>
        <Box sx={{
          display: "flex", flexDirection: "row", alignItems: "stretch", justifyContent: "space-around",
        }}
        >
          <Card sx={{
            minWidth: "275px", height: "100vh", backgroundColor: "#eeeeee", overflow: "scroll", margin: "5px",
          }}
          >
            <SavedJobCard></SavedJobCard>
          </Card>
          <Card sx={{
            minWidth: "275px", height: "100vh", backgroundColor: "#eeeeee", overflow: "scroll", margin: "5px",
          }}
          >
          </Card>
          <Card sx={{
            minWidth: "275px", height: "100vh", backgroundColor: "#eeeeee", overflow: "scroll", margin: "5px",
          }}
          >
          </Card>
          <Card sx={{
            minWidth: "275px", height: "100vh", backgroundColor: "#eeeeee", overflow: "scroll", margin: "5px",
          }}
          >
          </Card>
        </Box>
      </Container>
    </Layout>
  );
}

export default JoblicationPage;
