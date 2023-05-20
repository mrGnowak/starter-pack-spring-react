import { forwardRef } from "react";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { Link } from "@mui/material";
import { merge } from "lodash";

const LinkBehavior = forwardRef(function MuiNextLink(props, ref) {
  return <Link ref={ref} {...(props as any)} />;
});

export const palette = {
  primary: {
    main: "#556cd6",
  },
  secondary: {
    main: "#19857b",
  },
};

const themeOptions: ThemeOptions = {
  palette,
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as MuiLinkProps, //LinkProps missing component prop, workaround: https://github.com/mui/material-ui/issues/29942
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
  },
};

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
  },
};

export const darkTheme = createTheme(merge(themeOptions, darkThemeOptions));
export const lightTheme = createTheme(merge(themeOptions, lightThemeOptions));
