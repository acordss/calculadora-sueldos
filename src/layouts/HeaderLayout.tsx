import { AppBar, Box, Typography } from "@mui/material";
import logo from "../assets/images/logo-sut.png"; // Asegúrate que la ruta sea correcta

const HeaderLayout = () => {
	return (
		<AppBar
			position="sticky"
			sx={{ height: "10vh", px: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
			<Box sx={{ display: "flex", alignItems: "center", height: "100%", width: { sm: "60%" } }}>
				<img src={logo} alt="Logo SUT" style={{ height: "100%", marginRight: "1rem" }} />
				<Box>
					<Typography variant="h5" sx={{ fontSize: { xs: 17, sm: 24 }, fontWeight: 700 }}>
						Calculadora de sueldos
					</Typography>
					<Box sx={{ width: { sm: 260 }, height: "3px", bgcolor: "white", display: { lg: "block" } }}></Box>
				</Box>
			</Box>
		</AppBar>
	);
};

export default HeaderLayout;
