import { Box, Divider, Paper, Typography } from "@mui/material";
import EleccionVariables from "../components/EleccionVariables";

import Remuneraciones from "../components/Remuneraciones";
import Descuentos from "../components/Descuentos";
import SueldoBasicoMensual from "../components/SueldoBasicoMensual";
import TotalNeto from "../components/TotalNeto";

const CenterSideBody = () => {
	return (
		<>
			<Box sx={{ width: { lg: "60vw" }, pt: 4, gap: 3, display: "flex", flexDirection: "column" }}>
				<Box>
					<Typography variant="h5" sx={{ fontWeight: "bolder" }}>
						Bienvenido al Módulo de Cálculo de Sueldos
					</Typography>
					<Typography variant="body2">
						Por favor, siga las instrucciones para seleccionar los conceptos de remuneración y de descuentos que desea
						registrar.
						<br /> A continuación, podrá ingresar los valores correspondientes de forma sencilla y ordenada.
					</Typography>
				</Box>
				<Paper
					elevation={5}
					sx={{ display: "flex", p: 3, flexDirection: "column", gap: 3, borderRadius: "10px", mb: 3 }}>
					<Box sx={{ display: "grid", gridTemplateColumns: { lg: "0.95fr 0.1fr 0.95fr" }, gap: { xs: 2 } }}>
						<EleccionVariables />
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<Divider orientation={"vertical"} />
						</Box>
						<SueldoBasicoMensual />
					</Box>
					<Divider />
					<Box sx={{ display: "grid", gridTemplateColumns: { lg: "repeat(2,1fr)" }, gap: 3 }}>
						<Remuneraciones />
						<Descuentos />
					</Box>
					<Divider />
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<TotalNeto />
					</Box>
				</Paper>
			</Box>
		</>
	);
};

export default CenterSideBody;
