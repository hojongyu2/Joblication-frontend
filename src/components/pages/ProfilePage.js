import {
  Box, Button, Container, Stack, TextField, Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { userContext } from "../../context/UserContext";
import Axios from "../../utilities/Axios";
import EditProfileCard from "../card/EditProfileCard";
import Layout from "../layout/Layout";

function ProfilePage() {
  const { pagenatedData } = useContext(SearchContext);
  const { user } = useContext(userContext);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [adminError, setAdminError] = useState();
  const [isAdminTrue, setIsAdminTrue] = useState(false);
  const navigate = useNavigate();

  const onClickEdit = () => {
    setIsButtonClicked(true);
  };

  const checkIsAdmin = async () => {
    const response = await Axios.get("/check-admin");
    const fetchedData = response.data.toString();
    if (fetchedData === "true") {
      setIsAdminTrue(true);
      navigate("/admin");
    } else {
      setIsAdminTrue(false);
      setAdminError("only administrator users are allowed");
    }
  };

  return (
    <Layout>
      {pagenatedData && (
        navigate("/")
      )}
      <Container sx={{
        width: "100%",
        height: "100%",
        padding: "10px",
        backgroundColor: "lightgray",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
      }}
      >
        {!isAdminTrue && (
          <Typography>{adminError}</Typography>
        )}
        {!isButtonClicked && (
        <Box sx={{
          backgroundColor: "white", borderRadius: "10px",
        }}
        >
          <Stack direction="row" justifyContent="center">
            <TextField disabled defaultValue={user.firstName} variant="outlined" sx={{ padding: "10px" }}></TextField>
            <TextField disabled defaultValue={user.lastName} variant="outlined" sx={{ padding: "10px" }}></TextField>
          </Stack>
          <Stack direction="column" textAlign="center" justifyContent="center">
            <TextField disabled defaultValue={user.email} variant="outlined" sx={{ padding: "10px" }}></TextField>
            <TextField disabled defaultValue={user.jobTitle} variant="outlined" sx={{ padding: "10px" }}></TextField>
            <TextField disabled defaultValue="password" variant="outlined" sx={{ padding: "10px" }}></TextField>
            <Box>
              <Button onClick={onClickEdit} variant="contained" sx={{ marginBottom: "10px" }}>edit</Button>
            </Box>
            <Box>
              <Button onClick={checkIsAdmin} sx={{ paddingTop: "10px" }}>ARE YOU AN ADMIN?</Button>
            </Box>
          </Stack>
        </Box>
        )}
        {isButtonClicked
          && (
          <EditProfileCard></EditProfileCard>
          )}
      </Container>
    </Layout>
  );
}

export default ProfilePage;
