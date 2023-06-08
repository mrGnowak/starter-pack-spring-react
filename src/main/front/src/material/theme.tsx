import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptionsDark: ThemeOptions = {
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    mode: "dark",
  },
};

const themeOptionsLight: ThemeOptions = {
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    mode: "light",
  },
};

export const darkTheme = createTheme(themeOptionsDark);
export const lightTheme = createTheme(themeOptionsLight);
