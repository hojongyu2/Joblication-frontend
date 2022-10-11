import {
  Box, Button, Container, Stack, TextField,
} from "@mui/material";
import Link from "@mui/material/Link";
import { useContext, useState } from "react";
import Layout from "../layout/Layout";
import { userContext } from "../../context/UserContext";

function Login() {
  const { user, signIn, signOut } = useContext(userContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Layout>
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
            <TextField label="Email Address" variant="outlined" sx={{ padding: "10px" }} value={email} onChange={onChangeEmail}></TextField>
            <TextField label="Password" variant="outlined" sx={{ padding: "10px" }} value={password} onChange={onChangePassword}></TextField>
          </Stack>
          <Stack direction="row" textAlign="center" justifyContent="center" p={4} spacing={2}>
            <Button variant="contained">Log In</Button>
            <Button disabled>Or</Button>
            <Link href="/signup">
              <Button variant="contained">Create Account</Button>
            </Link>
          </Stack>
        </Box>
        <Button sx={{ paddingTop: "50px" }}>forgot password?</Button>
      </Container>
    </Layout>
  );
}

export default Login;
