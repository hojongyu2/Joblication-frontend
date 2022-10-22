import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import Axios from "../../utilities/Axios";
import { userContext } from "../../context/UserContext";
import { MyCompanyListContext } from "../../context/MyCompanyListContext";

export default function DashBoardMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { signOut, user } = React.useContext(userContext);
  const { setIsMyCompanyDataLoading } = React.useContext(MyCompanyListContext);

  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClickMyApp = () => {
    setIsMyCompanyDataLoading(true);
    setAnchorEl(null);
    setIsMyCompanyDataLoading(false);
  };
  const onClickSignOut = async () => {
    await Axios.get("/sign-out");
    signOut();
    setAnchorEl(null);
    navigate("/");
  };
  const onClickSignIn = () => {
    setAnchorEl(null);
    navigate("/login");
  };
  const onClickProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
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
        {!user && (
          <MenuItem onClick={onClickSignIn}>Sign-in</MenuItem>
        )}
        {(user) && (
          // navigate doesn't work. It does not show the most updated version of state
          // If I use navigate
          <Link href="/job-application" sx={{ textDecorationLine: "none" }}>
            <MenuItem onClick={onClickMyApp} style={{ color: "black" }}>My application</MenuItem>
          </Link>
        )}
        {user && (
          <MenuItem onClick={onClickProfile}>Profile</MenuItem>
        )}
        {user && (
          <MenuItem onClick={onClickSignOut}>Sign out</MenuItem>
        )}
      </Menu>
    </div>
  );
}
