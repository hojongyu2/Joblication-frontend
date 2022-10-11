import {
  Box, Button, Container, Stack, TextField,
} from "@mui/material";
import Link from "@mui/material/Link";
import { useContext, useState } from "react";
import Layout from "../layout/Layout";
import { userContext } from "../../context/UserContext";

function Signup() {
  const { user, signIn } = useContext(userContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeJobTitle = (e) => {
    setJobTitle(e.target.value);
  };
  const onClickRegister = () => {
    signIn({
      firstName,
      lastName,
      email,
      password,
      jobTitle,
    });
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
          <Stack direction="row" justifyContent="center">
            <TextField label="First Name" variant="outlined" sx={{ padding: "10px" }} value={firstName} onChange={onChangeFirstName}></TextField>
            <TextField label="Last Name" variant="outlined" sx={{ padding: "10px" }} value={lastName} onChange={onChangeLastName}></TextField>
          </Stack>
          <Stack direction="column" textAlign="center" justifyContent="center">
            <TextField label="Email Address" variant="outlined" sx={{ padding: "10px" }} value={email} onChange={onChangeEmail}></TextField>
            <TextField label="Password" variant="outlined" sx={{ padding: "10px" }} value={password} onChange={onChangePassword}></TextField>
            <TextField label="Job Title" variant="outlined" sx={{ padding: "10px" }} value={jobTitle} onChange={onChangeJobTitle}></TextField>
            <Link href="/">
              <Button variant="contained" sx={{ marginBottom: "10px" }} onClick={onClickRegister}>Register</Button>
            </Link>
          </Stack>
        </Box>
        <Link href="/">
          <Button sx={{ paddingTop: "50px" }}>ALREADY HAVE AN ACCOUNT?</Button>
        </Link>
      </Container>
    </Layout>
  );
}

export default Signup;
