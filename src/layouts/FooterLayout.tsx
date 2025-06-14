import { AppBar, Box, Typography } from "@mui/material";

const FooterLayout = () => {
	return (
		<>
			<Box sx={{ bgcolor: "primary.main", p: 2, textAlign: "center" }}>
				<Typography>Derechos reservados • Sitio web desarrollado por Accordss</Typography>
			</Box>
		</>
	);
};

export default FooterLayout;
