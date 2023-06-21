import { IconButton } from "@mui/material";
import IconClose from "@mui/icons-material/Close";
import { SnackbarKey, closeSnackbar } from "notistack";

export function SnackbarCloseButton({ barKey }: { barKey: SnackbarKey }) {
  return (
    <IconButton onClick={() => closeSnackbar(barKey)}>
      <IconClose />
    </IconButton>
  );
}
