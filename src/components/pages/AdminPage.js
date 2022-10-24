import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { userContext } from "../../context/UserContext";
import Axios from "../../utilities/Axios";
import Layout from "../layout/Layout";
import UserTable from "../table/AllUserTable";

function AdminPage() {
  const { allUsers, setAllUsers } = useContext(userContext);

  const { pagenatedData } = useContext(SearchContext);

  const navigate = useNavigate();

  const getAllUsers = async () => {
    const response = await Axios.get("/get-all-users");
    setAllUsers(response.data);
  };
  return (
    <Layout>
      {pagenatedData && (
        navigate("/")
        // go to main page if search funcionality has been actvated
      )}
      {allUsers && (
      <Button onClick={getAllUsers}>get all users</Button>
      )}
      {allUsers && (
        <UserTable></UserTable>
      )}
    </Layout>
  );
}

export default AdminPage;
