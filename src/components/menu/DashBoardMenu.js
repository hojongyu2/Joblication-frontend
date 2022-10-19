import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import Axios from "../../utilities/Axios";
import { userContext } from "../../context/UserContext";

export default function DashBoardMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { signOut, user } = React.useContext(userContext);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClickMyApp = () => {
    setAnchorEl(null);
    navigate("/job-application");
  };
  const onClickSignOut = () => {
    Axios.get("/sign-out");
    signOut();
    setAnchorEl(null);
    navigate("/");
  };
  const onClickSignIn = () => {
    setAnchorEl(null);
    navigate("/login");
  };
  return (
    <div>
      <Button
        variant="contained"
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "#fff" }}
      >
        Dashboard
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        {!user && (
          <MenuItem onClick={onClickSignIn}>Sign-in</MenuItem>
        )}
        {user && (
        <MenuItem onClick={onClickMyApp}>My application</MenuItem>
        )}
        {user && (
        <MenuItem onClick={onClickSignOut}>Logout</MenuItem>
        )}
      </Menu>
    </div>
  );
}
