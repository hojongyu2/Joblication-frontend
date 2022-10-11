import Box from "@mui/material/Box";
import Header from "./Header";

function Layout(props) {
  const { children } = props;
  return (
    <Box>
      <Box>
        <Header />
      </Box>
      <Box flexGrow={1} py={6} px={4}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
