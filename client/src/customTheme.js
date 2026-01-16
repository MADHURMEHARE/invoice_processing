import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  palette: {
    background: {
      default: "#f8f9fa",
    },
    indigo: {
      main: "#6610f2",
    },
    orange: {
      main: "#f4511e",
    },
    green: {
      main: "#07f011",
    },
    blue: {
      main: "#34aadc",
    },
    yellow: {
      main: "#f57c00",
    },
    darkRed: {
      main: "#7f0000",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#000000",
          color: "#fff",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "#fff",
          [`@media (max-width: ${600}px)`]: {
            // 在这里添加针对小屏幕的样式
            backgroundColor: "#0d47a1",
            color: "#fff",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "1.3rem",
          [`@media (max-width: ${600}px)`]: {
            // 在这里添加针对小屏幕的样式
            fontSize: "1rem",
          },
        },
      },
    },
  },
});
