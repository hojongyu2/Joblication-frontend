import {
  Box, Button, Container, Stack, TextField, Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { userContext } from "../../context/UserContext";
import Axios from "../../utilities/Axios";

function LoginPage() {
  const { signIn } = useContext(userContext);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [isUserErrorMessage, setIsUserErrorMessage] = useState("");
  const navigate = useNavigate();
  const onChangeEmail = (e) => {
    setUserLogin({
      ...userLogin, email: e.target.value,
    });
  };
  const onChangePassword = (e) => {
    setUserLogin({
      ...userLogin, password: e.target.value,
    });
  };
  const controlSubmitForm = async (e) => {
    e.preventDefault();
    const response = await Axios.post("/sign-in", { credentials: userLogin });
    if (response.data.success === false) {
      setIsUserErrorMessage(response.data.message);
    } else {
      const fetchedUser = response.data.user;
      signIn(fetchedUser);
      navigate("/");
    }
  };

  return (
    <Layout>
      <form onSubmit={controlSubmitForm}>
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
            <Stack spacing={2} justifyContent="center">
              <TextField label="Email Address" variant="outlined" sx={{ padding: "10px" }} value={userLogin.email} onChange={onChangeEmail} required></TextField>
              <TextField label="Password" variant="outlined" sx={{ padding: "10px" }} value={userLogin.password} onChange={onChangePassword} required></TextField>
            </Stack>
            <Stack direction="row" textAlign="center" justifyContent="center" p={4} spacing={2}>
              <Button type="submit" variant="contained">Log In</Button>
              <Button disabled>Or</Button>
              <Link href="/signup">
                <Button variant="contained">Create Account</Button>
              </Link>
            </Stack>
          </Box>
          <Typography variant="subtitle2">{isUserErrorMessage}</Typography>
          <Button sx={{ paddingTop: "50px" }}>forgot password?</Button>
        </Container>
      </form>
    </Layout>
  );
}

export default LoginPage;
