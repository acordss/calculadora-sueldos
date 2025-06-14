import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		mode: "light", // o 'dark'
		primary: {
			main: "#8a6e22",
		},
		secondary: {
			main: "#ff4081",
		},
	},
	typography: {
		fontFamily: "SF Pro",
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					textTransform: "none",
				},
			},
		},
	},
});

export default theme;
