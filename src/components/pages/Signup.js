import {
  Box, Button, Container, Stack, TextField,
} from "@mui/material";
import Link from "@mui/material/Link";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { userContext } from "../../context/UserContext";
import Axios from "../../utilities/Axios";

function Signup() {
  const { signIn } = useContext(userContext);
  const [userRegistration, setUserRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    jobTitle: "",
  });

  const navigate = useNavigate();

  const onChangeFirstName = (e) => {
    setUserRegistration({
      ...userRegistration, firstName: e.target.value,
    });
  };
  const onChangeLastName = (e) => {
    setUserRegistration({
      ...userRegistration, lastName: e.target.value,
    });
  };
  const onChangeEmail = (e) => {
    setUserRegistration({
      ...userRegistration, email: e.target.value,
    });
  };
  const onChangePassword = (e) => {
    setUserRegistration({
      ...userRegistration, password: e.target.value,
    });
  };
  const onChangeJobTitle = (e) => {
    setUserRegistration({
      ...userRegistration, jobTitle: e.target.value,
    });
  };
  const onClickRegister = async (e) => {
    e.preventDefault();

    const response = await Axios.post("/register-user", {
      ...userRegistration,
    });
    // console.log(response)
    const { user } = response.data;
    // receive user information from server and put it in the state.
    signIn(user);
    navigate("/");
  };

  return (
    <Layout>
      <form onSubmit={onClickRegister}>
        <Container sx={{
          width: "100%",
          height: "100%",
          padding: "100px",
          backgroundColor: "lightgray",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
        }}
        >
          <Box sx={{
            backgroundColor: "white", borderRadius: "10px",
          }}
          >
            <Stack direction="row" justifyContent="center">
              <TextField label="First Name" variant="outlined" sx={{ padding: "10px" }} value={userRegistration.firstName} onChange={onChangeFirstName} required></TextField>
              <TextField label="Last Name" variant="outlined" sx={{ padding: "10px" }} value={userRegistration.lastName} onChange={onChangeLastName} required></TextField>
            </Stack>
            <Stack direction="column" textAlign="center" justifyContent="center">
              <TextField label="Email Address" variant="outlined" sx={{ padding: "10px" }} value={userRegistration.email} onChange={onChangeEmail} required></TextField>
              <TextField label="Password" variant="outlined" sx={{ padding: "10px" }} value={userRegistration.password} type="password" onChange={onChangePassword} required></TextField>
              <TextField label="Job Title" variant="outlined" sx={{ padding: "10px" }} value={userRegistration.jobTitle} onChange={onChangeJobTitle} required></TextField>
              <Box>
                <Button type="submit" variant="contained" sx={{ marginBottom: "10px" }}>Register</Button>
              </Box>
            </Stack>
          </Box>
          <Link href="/">
            <Button sx={{ paddingTop: "50px" }}>ALREADY HAVE AN ACCOUNT?</Button>
          </Link>
        </Container>
      </form>
    </Layout>
  );
}

export default Signup;
