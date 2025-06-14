import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Variables } from "../interfaces/variables";
import FilaVariablesDescuentos from "./FilaVariablesDescuentos";
import type { Valores } from "../interfaces/valores";
import { sum } from "mathjs";
import { useSueldo } from "../context/SueldoContext";

const Descuentos = () => {
	const [variables, setVariables] = useState<Variables[]>([]);

	const [valoresDescuentos, setValoresDescuentos] = useState<Valores[]>([]);

	const { setTotalDescuentos } = useSueldo();

	const [total, setTotal] = useState(0);

	useEffect(() => {
		const variablesIds = variables.map((v) => v.id);

		const nuevosValores = valoresDescuentos.filter((v) => variablesIds.includes(v.id));

		const total = sum(nuevosValores.map((v) => v.valor));
		setTotal(total);

		setTotalDescuentos(total);

		setValoresDescuentos((prev) => {
			const esIgual =
				prev.length === nuevosValores.length &&
				prev.every((v, i) => v.id === nuevosValores[i].id && v.valor === nuevosValores[i].valor);

			return esIgual ? prev : nuevosValores;
		});
	}, [variables, valoresDescuentos]);

	useEffect(() => {
		const loadVariables = () => {
			const stored = localStorage.getItem("variablesDescuentos");
			if (stored && stored !== "undefined") {
				setVariables(JSON.parse(stored));
			}
		};

		loadVariables();

		window.addEventListener("descuentosActualizados", loadVariables);

		return () => {
			window.removeEventListener("descuentosActualizados", loadVariables);
		};
	}, []);

	return (
		<>
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
					<Typography sx={{ fontWeight: "bolder", fontSize: 18 }}>Descuentos</Typography>
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
						<Box></Box>
						<Box>
							<Typography variant="body2" sx={{ fontWeight: "bolder", fontSize: { xs: 12, sm: 13 } }}>
								Importe
							</Typography>
						</Box>
					</Box>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						{variables && variables.length > 0 ? (
							variables.map((variable) => (
								<FilaVariablesDescuentos
									key={variable.id}
									variable={variable}
									setValoresDescuentos={setValoresDescuentos}
								/>
							))
						) : (
							<Box sx={{ textAlign: "center" }}>
								<Typography variant="body2" color="text.secondary" sx={{ fontSize: 12, fontStyle: "italic" }}>
									Seleccione una o más variables de descuento para comenzar
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
								<Typography variant="body2" sx={{ fontWeight: "bolder", fontSize: { xs: 12, sm: 13 } }}>
									S/ {total.toFixed(2)}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Descuentos;
