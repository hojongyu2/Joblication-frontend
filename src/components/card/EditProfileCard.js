import {
  Box, Button, Stack, TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { userContext } from "../../context/UserContext";
import Axios from "../../utilities/Axios";

function EditProfileCard() {
  const { user } = useContext(userContext);

  const [editUser, setEditUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    oldPassword: "",
    newPassword: "",
    matchPassword: "",
    jobTitle: user.jobTitle,
  });

  const [error, setError] = useState("");

  const onChangeFirst = (e) => {
    setEditUser({
      ...editUser, firstName: e.target.value,
    });
  };
  const onChangeLast = (e) => {
    setEditUser({
      ...editUser, lastName: e.target.value,
    });
  };
  const onChangeEmailAddress = (e) => {
    setEditUser({
      ...editUser, email: e.target.value,
    });
  };
  const onChangePasswords = (e) => {
    setEditUser({
      ...editUser, oldPassword: e.target.value,
    });
  };
  const onChangeNewPassword = (e) => {
    setEditUser({
      ...editUser, newPassword: e.target.value,
    });
  };
  const onChangeMatchPassword = (e) => {
    setEditUser({
      ...editUser, matchPassword: e.target.value,
    });
  };
  const onChangeJob = (e) => {
    setEditUser({
      ...editUser, jobTitle: e.target.value,
    });
  };

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    if (editUser.newPassword !== editUser.matchPassword) {
      setError("The password confirmation does not match");
    }
    const response = await Axios.post("/edit-user", {
      ...editUser,
    });
    if (response.data.success === true) {
      setEditUser({
        firstName: response.data.message.firstName,
        lastName: response.data.message.lastName,
        email: response.data.message.email,
        jobTitle: response.data.message.jobTitle,
      });
      // need to fix this
      window.location.reload();
    }
  };

  return (
    <form onSubmit={onSubmitEdit}>
      {error}
      <Box sx={{
        backgroundColor: "white", borderRadius: "10px",
      }}
      >
        <Stack direction="row" justifyContent="center">
          <TextField label="First Name" value={editUser.firstName} variant="outlined" sx={{ padding: "10px" }} onChange={onChangeFirst} required></TextField>
          <TextField label="Last Name" value={editUser.lastName} variant="outlined" sx={{ padding: "10px" }} onChange={onChangeLast} required></TextField>
        </Stack>
        <Stack direction="column" textAlign="center" justifyContent="center">
          <TextField label="Email Address" value={editUser.email} variant="outlined" sx={{ padding: "10px" }} onChange={onChangeEmailAddress} required></TextField>
          <TextField label="Old Password" variant="outlined" value={editUser.oldPassword} sx={{ padding: "10px" }} onChange={onChangePasswords} required></TextField>
          <TextField label="New Password" variant="outlined" value={editUser.newPassword} sx={{ padding: "10px" }} onChange={onChangeNewPassword} required></TextField>
          <TextField label="Re-enter New Password" variant="outlined" value={editUser.matchPassword} sx={{ padding: "10px" }} onChange={onChangeMatchPassword} required></TextField>
          <TextField label="Job Title" value={editUser.jobTitle} variant="outlined" sx={{ padding: "10px" }} onChange={onChangeJob} required></TextField>
          <Box>
            <Button type="submit" variant="contained" sx={{ marginBottom: "10px" }}>submit</Button>
          </Box>
        </Stack>
      </Box>
    </form>
  );
}

export default EditProfileCard;
