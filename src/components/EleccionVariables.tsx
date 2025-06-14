import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import VentanaCasillas from "./VentanaCasillas";
import StepOne from "../assets/svg/StepOne";

const EleccionVariables = () => {
	const [open, setOpen] = useState(false);
	const [tipo, setTipo] = useState("");

	const handleOpen = (tipo: string): void => {
		setTipo(tipo);
		setOpen(true);
	};

	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column", width: "100%", textAlign: "center", gap: 2 }}>
				<Box>
					<StepOne sx={{ fontSize: 50, color: "primary.main" }} />
				</Box>
				<Typography sx={{ fontWeight: "bolder" }}>Elije las variables a usar para el cálculo</Typography>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: { xs: "center" },
						width: "100%",
						gap: { xs: 3, lg: 5 },
						flexDirection: { xs: "column", sm: "row" },
					}}>
					<Button
						variant="contained"
						sx={{ width: 150 }}
						startIcon={<ArrowUpwardIcon />}
						onClick={() => handleOpen("remuneraciones")}>
						Remuneraciones
					</Button>
					<Button
						variant="contained"
						sx={{ width: 150 }}
						startIcon={<ArrowDownwardIcon />}
						onClick={() => handleOpen("descuentos")}>
						Descuentos
					</Button>
				</Box>
			</Box>
			<VentanaCasillas open={open} setOpen={setOpen} tipo={tipo} />
		</>
	);
};

export default EleccionVariables;
