import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

function GreetingCard() {
  return (
    <Container>
      <Box minWidth={100} textAlign="center">
        <Typography variant="h3" sx={{ color: "#0075FF" }}><strong>Joblication</strong></Typography>
        <Typography variant="h4">Find your next job!</Typography>
      </Box>
    </Container>
  );
}

export default GreetingCard;
