import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      red: "#E53E3E",
      black: "#1A202C",
      white: "#FFFFFF"
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold", 
      },
    },
  },
});

export default theme;
