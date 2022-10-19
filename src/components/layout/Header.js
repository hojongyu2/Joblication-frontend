import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import { Button, Link } from "@mui/material";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import Axios from "../../utilities/Axios";
import DashBoardMenu from "../menu/DashBoardMenu";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(7em + ${theme.spacing(6)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const {
    search, setSearch, setPagenatedData,
  } = useContext(SearchContext);

  const onChangeJobTitle = (e) => {
    setSearch({
      ...search, jobTitle: e.target.value,
    });
  };
  const onChangeLocation = (e) => {
    setSearch({
      ...search, location: e.target.value,
    });
  };
  const onClickSearch = async (e) => {
    e.preventDefault();
    const response = await Axios.post("/job-search", { jobTitle: search.jobTitle, location: search.location });
    const fetchedData = response.data;
    setPagenatedData(fetchedData);
    // console.log(pagenatedData.searchResult.map((x) => x.map((y) => y.title)));
    // console.log(pagenatedData.searchResult[0].map((x) => x.title));
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <form onSubmit={onClickSearch}>
          <Toolbar>
            <Link href="/">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block", color: "#fff" } }}
              >
                Joblication
              </Typography>
            </Link>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Job Title or keyword"
                inputProps={{ "aria-label": "search" }}
                value={search.jobTitle}
                onChange={onChangeJobTitle}
              />
            </Search>
            <Search>
              <SearchIconWrapper>
                <PlaceIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Location"
                inputProps={{ "aria-label": "search" }}
                value={search.location}
                onChange={onChangeLocation}
              />
            </Search>
            <Button type="submit" variant="contained" sx={{ margin: "10px", color: "#fff" }}>Search</Button>
            <DashBoardMenu></DashBoardMenu>
          </Toolbar>
        </form>
      </AppBar>
    </Box>
  );
}
