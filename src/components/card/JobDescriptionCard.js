import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import Link from "@mui/material/Link";
import { Avatar, CardMedia } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { SearchContext } from "../../context/SearchContext";
import Axios from "../../utilities/Axios";
import { userContext } from "../../context/UserContext";
import { MyCompanyListContext } from "../../context/MyCompanyListContext";

export default function JobDescriptionCard() {
  const { pagenatedData } = useContext(SearchContext);
  const { user } = useContext(userContext);
  const { setMyCompanyList, myCompanyList } = useContext(
    MyCompanyListContext,
  );
  return (
    <Card sx={{
      height: "100vh", backgroundColor: "#e0f2f1", overflow: "scroll", maxWidth: "800px",
    }}
    >
      {pagenatedData.searchResult.map((x) => x.map((y, index) => (
        <Box
          sx={{ padding: "10px" }}
          key={index}
        >
          <Box display="flex" flexDirection="row" justifyContent="space-between" backgroundColor="white" sx={{ padding: "5px", borderRadius: "10px 10px 0px 0px" }}>
            <Box display="flex" flexDirection="column">
              <Typography sx={{ mb: 1.5, display: "inline-flex" }} color="text.secondary">
                <CircleIcon sx={{ width: "8px", marginRight: "5px" }} />
                {y.title}
              </Typography>
              <Typography sx={{ mb: 1.5, display: "inline-flex" }} color="text.secondary">
                <CircleIcon sx={{ width: "8px", marginRight: "5px" }} />
                {y.company}
              </Typography>
              <Typography sx={{ mb: 1.5, display: "inline-flex" }} color="text.secondary">
                <CircleIcon sx={{ width: "8px", marginRight: "5px" }} />
                {y.location}
              </Typography>
            </Box>
            {user && (
            <CardActions>
              <Button
                variant="contained"
                color="error"
                onClick={async () => {
                  const response = await Axios.post("/joblication", {
                    jobTitle: y.title,
                    company: y.company,
                    location: y.location,
                    url: y.url,
                  });
                  setMyCompanyList((myCompanyList) => [...myCompanyList, {
                    jobTitle: y.title,
                    company: y.company,
                    location: y.location,
                    url: y.url,
                    saved: response.data.saved,
                  }]);
                }}
              >
                Add
              </Button>
            </CardActions>
            )}
            {!user && (
              <Link href="/login">
                <Button>
                  Login
                </Button>
              </Link>
            )}
          </Box>
          <Box backgroundColor="white" display="flex" flexDirection="row" justifyContent="center" sx={{ padding: "5px", borderRadius: "0px 0px 10px 10px" }}>
            <Link href={y.url} target="_blank">
              <Typography variant="h6">
                Read more and Apply now
              </Typography>
            </Link>
          </Box>
        </Box>
      )))}
    </Card>
  );
}
