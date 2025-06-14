import { useEffect, useState } from "react";
import type { Variables } from "../interfaces/variables";
import { Box, Divider, Typography } from "@mui/material";
import FilaVariablesRemuneraciones from "./FilaVariablesRemuneraciones";
import { sum } from "mathjs";
import type { Valores } from "../interfaces/valores";
import { useSueldo } from "../context/SueldoContext";

const Remuneraciones = () => {
	const [variables, setVariables] = useState<Variables[]>([]);

	const [valoresRemuneraciones, setValoresRemuneraciones] = useState<Valores[]>([]);

	const { setTotalRemuneraciones } = useSueldo();

	const [total, setTotal] = useState(0);

	useEffect(() => {
		const variablesIds = variables.map((v) => v.id);

		const nuevosValores = valoresRemuneraciones.filter((v) => variablesIds.includes(v.id));

		// Este cálculo ahora es independiente del setValoresRemuneraciones
		const totalCalculado = sum(nuevosValores.map((v) => v.valor));
		setTotal(totalCalculado);
		setTotalRemuneraciones(totalCalculado);
	}, [variables, valoresRemuneraciones]);

	useEffect(() => {
		const loadVariables = () => {
			const stored = localStorage.getItem("variablesRemuneraciones");
			if (stored && stored !== "undefined") {
				const parsed = JSON.parse(stored);
				setVariables(parsed);
			}
		};

		loadVariables();

		window.addEventListener("remuneracionesActualizadas", loadVariables);

		return () => {
			window.removeEventListener("remuneracionesActualizadas", loadVariables);
		};
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				minHeight: 150,
				border: "1px solid #ccc",
				p: 3,
				borderRadius: "20px",
				flexDirection: "column",
				gap: 3,
			}}>
			<Box sx={{ textAlign: "center" }}>
				<Typography sx={{ fontWeight: "bolder", fontSize: 18 }}>Remuneraciones</Typography>
			</Box>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "2fr 1fr 1fr",
						justifyContent: "center",
						alignItems: "center",
						gap: 2,
						textAlign: "center",
					}}>
					<Box>
						<Typography variant="body2" sx={{ fontWeight: "bolder", fontSize: { xs: 12, sm: 13 } }}>
							Descripción
						</Typography>
					</Box>
					<Box>
						<Typography variant="body2" sx={{ fontWeight: "bolder", fontSize: { xs: 12, sm: 13 } }}>
							Cantidad
						</Typography>
					</Box>
					<Box>
						<Typography variant="body2" sx={{ fontWeight: "bolder", fontSize: { xs: 12, sm: 13 } }}>
							Importe
						</Typography>
					</Box>
				</Box>
				{variables && variables.length > 0 ? (
					variables.map((variable) => (
						<FilaVariablesRemuneraciones
							key={variable.id}
							variable={variable}
							setValoresRemuneraciones={setValoresRemuneraciones}
						/>
					))
				) : (
					<Box sx={{ textAlign: "center" }}>
						<Typography variant="body2" color="text.secondary" sx={{ fontSize: 12, fontStyle: "italic" }}>
							Seleccione una o más variables de remuneración para comenzar
						</Typography>
					</Box>
				)}

				<Divider />
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: { xs: "2fr 1fr 3fr", sm: "2fr 1fr 1fr" },
						justifyContent: "center",
						alignItems: "center",
						gap: 2,
						textAlign: "center",
					}}>
					<Box></Box>
					<Box>
						<Typography variant="body2" sx={{ fontWeight: "bolder", fontSize: { xs: 12, sm: 13 } }}>
							Total
						</Typography>
					</Box>
					<Box>
						<Typography variant="body2" sx={{ fontWeight: "bolder", fontSize: 12, sm: 13 }}>
							S/ {total.toFixed(2)}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Remuneraciones;
