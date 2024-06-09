import { createTheme } from "@mui/material";
import { customPrimaryColors, customSecondaryColors } from "./customColors";
import { typography } from "./Components-Theme/typography";
import { themeBreakPoints } from "./Components-Theme/breakPoints";
const theme = createTheme({
  breakpoints: {
    values: {
      ...themeBreakPoints.values,
    },
  },
  palette: {
    primary: {
      ...customPrimaryColors,
    },
    secondary: {
      ...customSecondaryColors,
    },
    success: { main: "#EDF7F5" },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
        },
        "html::-webkit-scrollbar": {
          width: "0.5rem",
        },
        "html::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "html::-webkit-scrollbar-thumb": {
          background: "#3BA68C",
          borderRadius: "5rem",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        // disableRipple: true,
        disableElevation: true,
        // disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "inherit",
          },
          fontFamily: "Poppins",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
  typography: typography(),
});
export default theme;
