import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";
import { userContext } from "../../context/UserContext";
import Axios from "../../utilities/Axios";

function ControlledSwitches() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}

export default function UserTable() {
  const { allUsers, setAllUsers } = useContext(userContext);
  console.log(allUsers)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Id</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Job title</TableCell>
            <TableCell align="right">Admin</TableCell>
            <TableCell align="right">Assign Admin</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="user">
                {user._id}
              </TableCell>
              <TableCell align="right">{user.firstName}</TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.jobTitle}</TableCell>
              <TableCell align="right">{String(user.isAdmin)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={async () => {
                  // if user admin is true, then set admin as false;
                  // if user admin is false, then se admin as true;
                  await Axios.post("/assign-admin", { userId: user._id });
                }}
                >
                  <ControlledSwitches></ControlledSwitches>
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={async () => {
                  // delete when clicked
                  await Axios.post("/delete-user", { userId: user._id });
                }}
                >
                  <DeleteIcon></DeleteIcon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
