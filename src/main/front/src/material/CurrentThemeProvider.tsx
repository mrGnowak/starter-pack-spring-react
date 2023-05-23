import { PaletteMode } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { darkTheme } from "./theme";
import { lightTheme } from "./theme";

export type CurrentThemeContextType = {
  theme: PaletteMode;
  setTheme: (theme: PaletteMode) => void;
};

const defaultContext: CurrentThemeContextType = {
  theme: "light",
  setTheme: () => {
    console.warn("No theme provider found");
  },
} as const;

function isPaletteMode(theme: any): theme is PaletteMode {
  return theme === "light" || theme === "dark";
}

const CurrentThemeContext =
  React.createContext<CurrentThemeContextType>(defaultContext);

export function useCurrentTheme() {
  return React.useContext(CurrentThemeContext);
}

const THEME_KEY = "theme";

export function CurrentThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPalette, setCurrentPalette] =
    React.useState<PaletteMode | null>(null);

  React.useEffect(() => {
    const localTheme = localStorage.getItem(THEME_KEY);
    setCurrentPalette(() =>
      isPaletteMode(localTheme)
        ? localTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }, []);

  const setPalette = React.useCallback(
    (theme: PaletteMode) => {
      localStorage.setItem(THEME_KEY, theme);
      setCurrentPalette(theme);
    },
    [setCurrentPalette]
  );

  const contextValue = React.useMemo(
    () => ({
      theme: currentPalette ?? "light",
      setTheme: setPalette,
    }),
    [currentPalette, setPalette]
  );

  const theme = React.useMemo(
    () => (currentPalette === "dark" ? darkTheme : lightTheme),
    [currentPalette]
  );

  React.useEffect(() => {
    document.documentElement.style.setProperty("color-scheme", currentPalette);
  }, [currentPalette]);

  if (currentPalette === null) {
    return null;
  }

  return (
    <CurrentThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CurrentThemeContext.Provider>
  );
}
