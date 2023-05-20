import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Link,
  useScrollTrigger,
  Slide,
  ListItemIcon,
} from "@mui/material";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

import React from "react";
import {
  AccountCircle,
  Dns,
  Home,
  Logout,
  Person2,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Box, Stack } from "@mui/system";
import { useIsMobile } from "../material/useIsMobile";
import { useCurrentTheme } from "../material/CurrentThemeProvider";

const menuItems = [
  { icon: <Home />, label: "Home", linkTo: "/" },
  { icon: <Dns />, label: "About", linkTo: "/about" },
];

export default function Header() {
  const isMobile = useIsMobile();

  const leftMenu = useMenu();
  const rightMenu = useMenu();

  const trigger = useScrollTrigger();

  const container = (content: React.ReactNode) =>
    isMobile ? (
      <>
        <Slide appear={false} direction="down" in={!trigger}>
          <AppBar>
            <Toolbar>{content}</Toolbar>
          </AppBar>
        </Slide>
        <Toolbar />
      </>
    ) : (
      <>
        <AppBar position="fixed">
          <Toolbar>{content}</Toolbar>
        </AppBar>
        <Toolbar />
      </>
    );

  const leftElementsContainer = (content: React.ReactNode[]) =>
    isMobile ? (
      <Menu
        anchorEl={leftMenu.anchorEl}
        open={leftMenu.isOpen}
        onClick={leftMenu.close}
      >
        {content}
      </Menu>
    ) : (
      <Stack direction="row" spacing={2}>
        {content}
      </Stack>
    );

  const LeftElement = isMobile ? MItem : MButton;

  return container(
    <>
      {isMobile && (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={leftMenu.open}
          sx={{ padding: "10px", marginLeft: "5px" }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Link href="/" style={{ display: "flex" }}></Link>
      <Box sx={{ mr: 2 }}></Box>
      {leftElementsContainer(
        menuItems.map((items) => (
          <LeftElement
            key={items.label}
            href={items.linkTo}
            label={items.label}
            icon={items.icon}
          />
        ))
      )}
      <Box sx={{ flexGrow: 1 }} />{" "}
      {/* This element pushes all below elements to the right */}
      <ChangeThemeButton />
      {"true" ? (
        <>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={rightMenu.open}
            sx={{ padding: "10px", marginLeft: "5px" }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={rightMenu.anchorEl}
            open={rightMenu.isOpen}
            onClick={rightMenu.close}
          >
            <MItem label="Profile" href="/profile" icon={<Person2 />} />
            <MItem label="Logout" href="/api/logout" icon={<Logout />} />
          </Menu>
        </>
      ) : (
        <>
          <MButton label="Login" href="/login" />
        </>
      )}
    </>
  );
}

function MItem({
  label,
  href,
  icon,
  onClick,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <MenuItem component={Link} href={href} onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <Typography>{label}</Typography>
    </MenuItem>
  );
}

function MButton({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon?: React.ReactNode;
}) {
  return (
    <Button
      color="inherit"
      sx={{ boxShadow: "none" }}
      href={href}
      startIcon={icon}
    >
      {label}
    </Button>
  );
}

function ChangeThemeButton() {
  const currentTheme = useCurrentTheme();
  return (
    <IconButton
      size="medium"
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={() =>
        currentTheme.setTheme(currentTheme.theme === "light" ? "dark" : "light")
      }
    >
      {currentTheme.theme === "dark" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}

function useMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const open = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const close = () => {
    setAnchorEl(null);
  };

  return { anchorEl, isOpen, open, close };
}
