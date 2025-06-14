import { Box, Typography } from "@mui/material";
import { useSueldo } from "../context/SueldoContext";
import { sum } from "mathjs";

const TotalNeto = () => {
	const { totalRemuneraciones, totalDescuentos } = useSueldo();

	const totalNeto = sum(totalRemuneraciones, -totalDescuentos);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					width: { xs: "90%", lg: "60%" },
					justifyContent: "space-between",
					borderBottom: "1px solid #ccc",
				}}>
				<Typography variant="h5" sx={{ fontWeight: "bolder", fontSize: { xs: 17 } }}>
					Neto a pagar:
				</Typography>
				<Typography variant="h5" sx={{ fontSize: { xs: 17 } }}>
					S/ {totalNeto.toFixed(2)}
				</Typography>
			</Box>
		</>
	);
};

export default TotalNeto;
