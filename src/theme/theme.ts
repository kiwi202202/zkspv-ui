import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { title } from "process";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#fde2e2",
      100: "#faccac",
      200: "#f89976",
      300: "#DB2D2D",
      400: "#f4421d",
      500: "#B80000",
      600: "#ac2316",
      700: "#801a12",
      800: "#55110d",
      900: "#2b0806",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#F7F7F7",
        color: "black",
      },
    },
  },
  fonts: {
    heading: `'Comic Neue', cursive`,
    body: `'Comic Neue', cursive`,
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  components: {
    Button: {
      baseStyle: {
        textTransform: "uppercase",
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: "600",
        lineHeight: "24px",
        letterSpacing: "-1px",
      },
      sizes: {
        xl: {
          fontSize: "20px",
          fontWeight: "500",
          lineHeight: "32px",
        },
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.700",
          },
        },
      },
    },
    Text: {
      baseStyle: {
        color: "black",
      },
      variants: {
        title: {
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          fontSize: "20px",
          lineHeight: "28px",
          letterSpacing: "-1px",
          textAlign: "left",
          color: "#222222",
        },
        description: {
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 300,
          fontSize: "18px",
          lineHeight: "24px",
          letterSpacing: "-1px",
          textAlign: "left",
          color: "#666666",
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: "black",
      },
      baseStyle: {
        field: {
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 300,
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "-1px",
          textAlign: "left",
          color: "rgb(182, 182, 182)",
          _focus: {
            borderColor: "black",
          },
        },
      },
    },
    Code: {
      baseStyle: {
        fontFamily: '"JetBrains Mono", monospace',
        fontWeight: "300",
        fontSize: "14px",
        lineHeight: "24px",
        letterSpacing: "-1px",
        textAlign: "left",
        color: "rgb(69, 0, 0)",
      },
    },
    Tabs: {
      baseStyle: {
        tab: {
          fontWeight: "bold",
          color: "grey.600",
          _selected: {
            color: "brand.700",
            borderBottomColor: "brand.700",
          },
          _hover: {
            color: "brand.500",
          },
        },
        tabpanel: {
          padding: 4,
        },
      },
    },
    TabList: {
      baseStyle: {
        borderRadius: 0,
        paddingX: 4,
        paddingY: 2,
      },
    },
    TabPanels: {
      baseStyle: {
        mt: 2,
      },
    },
    Tab: {
      baseStyle: {
        borderRadius: 0,
        _focus: {
          boxShadow: "none",
        },
      },
      // borderRight: '1px solid black',
      // _last: {
      //   borderRight: '0',
      // },
    },
    TabPanel: {
      baseStyle: {
        p: 4,
      },
    },
  },
});

export default theme;
