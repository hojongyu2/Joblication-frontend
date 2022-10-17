import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import Link from "@mui/material/Link";
import Work from "@mui/icons-material/Work";
import { SearchContext } from "../../context/SearchContext";
import Pagenation from "./Pagenation";

export default function JobDescriptionCard() {
  const { pagenatedData } = useContext(SearchContext);
  return (
    <Card sx={{
      minWidth: "100%", height: "100vh", backgroundColor: "#eeeeee", overflow: "scroll",
    }}
    >
      {pagenatedData.searchResult.map((x) => x.map((y, index) => (
        <Box
          sx={{ padding: "30px" }}
        >
          {index + 1}
          <Box display="flex" flexDirection="row" justifyContent="space-between" backgroundColor="white" sx={{ padding: "5px", borderRadius: "10px 10px 0px 0px" }}>
            <Work></Work>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {y.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {y.company}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {y.location}
            </Typography>
            <CardActions>
              <Button variant="contained">Add</Button>
            </CardActions>
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="center" backgroundColor="white" sx={{ padding: "5px", borderRadius: "0px 0px 10px 10px" }}>
            <Link href={y.url} target="_blank" variant="h6">
              {`${y.snippet.replace(/(\r\n|\n|\r)/gm, "").split(" ").slice(0, 15).join(" ")}....`}
            </Link>
          </Box>
        </Box>
      )))}
    </Card>
  );
}
