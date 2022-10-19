import { Box, Typography } from "@mui/material";
import { useContext } from "react";

import { SearchContext } from "../../context/SearchContext";
import GreetingCard from "../card/GreetingCard";

import JobDescriptionCard from "../card/JobDescriptionCard";
import Layout from "../layout/Layout";

function MainPage() {
  const { pagenatedData } = useContext(SearchContext);
  return (
    <Layout>
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
      {!pagenatedData && (
        <GreetingCard></GreetingCard>
      )}
    </Layout>
  );
}

export default MainPage;
