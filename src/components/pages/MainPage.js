import { Box, Button } from "@mui/material";
import Layout from "../layout/Layout";

function MainPage() {
  return (
    <Layout>
      <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
        <Button variant="contained">Sign In</Button>
      </Box>
    </Layout>
  );
}

export default MainPage;
