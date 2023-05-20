import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const FOOTER_HEIGHT = 64;

export default function Footer() {
  return (
    <Box
      sx={(theme) => ({
        height: FOOTER_HEIGHT,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      })}
    >
      <Typography variant="h6" align="center" gutterBottom>
        My Website
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"© "}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}
