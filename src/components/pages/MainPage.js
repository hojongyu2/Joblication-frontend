import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { userContext } from "../../context/UserContext";
import Axios from "../../utilities/Axios";
import JobDescriptionCard from "../card/JobDescriptionCard";
import Pagenation from "../card/Pagenation";
import Layout from "../layout/Layout";

function MainPage() {
  const { signOut } = useContext(userContext);
  const navigate = useNavigate();
  const { pagenatedData } = useContext(SearchContext);

  const onClickSignOut = () => {
    Axios.get("/sign-out");
    signOut();
    navigate("/");
  };

  return (
    <Layout>
      {Pagenation}
      {pagenatedData
      && (
      <Box>
        <Typography fontWeight="bold" fontSize={40}>
          {pagenatedData.total}
          {" "}
          Jobs for Sales
          {}
        </Typography>
        {}
        <JobDescriptionCard></JobDescriptionCard>
      </Box>
      )}
      <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
        <Button variant="contained" onClick={onClickSignOut}>sign out</Button>
      </Box>
    </Layout>
  );
}

export default MainPage;
