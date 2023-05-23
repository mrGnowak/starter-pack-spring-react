import { createTheme, ThemeOptions } from "@mui/material/styles";

export const palette = {
  primary: {
    main: "#556cd6",
  },
  secondary: {
    main: "#19857b",
  },
};

const themeOptionsDark: ThemeOptions = {
  palette: {
    mode: "dark",
  },
};

const themeOptionsLight: ThemeOptions = {
  palette: {
    mode: "light",
  },
};

export const darkTheme = createTheme(themeOptionsDark);
export const lightTheme = createTheme(themeOptionsLight);
