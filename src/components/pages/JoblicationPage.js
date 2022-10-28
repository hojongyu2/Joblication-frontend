import {
  BottomNavigation,
  BottomNavigationAction,
  Box, Card, Container,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { SearchContext } from "../../context/SearchContext";
import WatchListCard from "../card/WatchListCard";
import AppliedCard from "../card/AppliedCard";
import InterviewCard from "../card/InterviewCard";
import AcceptedCard from "../card/AcceptedCard";

function JoblicationPage() {
  const { pagenatedData } = useContext(SearchContext);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  return (
    <Layout>
      {pagenatedData && (
        navigate("/")
      // go to main page if search funcionality has been actvated
      )}
      <Container>
        <Box sx={{
          width: "100%", display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-around",
        }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, index) => {
              setValue(index);
            }}
          >
            <BottomNavigationAction label="Watch-List" />
            <BottomNavigationAction label="Applied" />
            <BottomNavigationAction label="Interview" />
            <BottomNavigationAction label="Accepted" />
          </BottomNavigation>
        </Box>
        <Box sx={{
          display: "flex", flexDirection: "row", alignItems: "stretch", justifyContent: "space-around",
        }}
        >
          <Card sx={{
            minWidth: "100%", height: "100vh", backgroundColor: "#eeeeee", overflow: "scroll", margin: "5px",
          }}
          >
            {value === 0 && (
              <WatchListCard></WatchListCard>
            )}
            {value === 1 && (
              <AppliedCard></AppliedCard>
            )}
            {value === 2 && (
              <InterviewCard></InterviewCard>
            )}
            {value === 3 && (
              <AcceptedCard></AcceptedCard>
            )}
          </Card>
        </Box>
      </Container>
    </Layout>
  );
}

export default JoblicationPage;
