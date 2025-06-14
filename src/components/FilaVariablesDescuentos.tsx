import { Box, Divider, Typography } from "@mui/material";
import type { Variables } from "../interfaces/variables";
import { useSueldo } from "../context/SueldoContext";
import { evaluate } from "mathjs";
import type { Valores } from "../interfaces/valores";
import { useEffect } from "react";

type FilaVariablesDescuentosProps = {
	variable: Variables;
	setValoresDescuentos: React.Dispatch<React.SetStateAction<Valores[]>>;
};

const FilaVariablesDescuentos = ({ variable, setValoresDescuentos }: FilaVariablesDescuentosProps) => {
	const { totalRemuneraciones } = useSueldo();

	const resultado = evaluate(variable.formula, {
		totalRemuneraciones: totalRemuneraciones,
	});

	useEffect(() => {
		setValoresDescuentos((prev) => {
			const existe = prev.find((v) => v.id === variable.id);

			if (existe) {
				return prev.map((v) => (v.id === variable.id ? { id: variable.id, valor: resultado } : v));
			} else {
				return [...prev, { id: variable.id, valor: resultado }];
			}
		});
	}, [resultado, setValoresDescuentos, variable.id]);
	return (
		<>
			<Divider />
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "2fr 1fr 1fr",
					justifyContent: "center",
					alignItems: "center",
					gap: 2,
					height: 30,
					textAlign: "center",
				}}>
				<Box>
					<Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 13 } }}>
						{variable.descripcion}
					</Typography>
				</Box>
				<Box></Box>
				<Box>
					<Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 13 } }}>
						{resultado.toFixed(2)}
					</Typography>
				</Box>
			</Box>
		</>
	);
};

export default FilaVariablesDescuentos;
