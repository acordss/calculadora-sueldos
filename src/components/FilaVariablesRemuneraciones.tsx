import { Box, Divider, TextField, Typography } from "@mui/material";
import type { Variables } from "../interfaces/variables";
import { useEffect, useState } from "react";
import { evaluate } from "mathjs";
import { useSueldo } from "../context/SueldoContext"; // importa el hook
import type { Valores } from "../interfaces/valores";

type FilaVariablesRemuneracionesProps = {
	variable: Variables;
	setValoresRemuneraciones: React.Dispatch<React.SetStateAction<Valores[]>>;
};

const FilaVariablesRemuneraciones = ({ variable, setValoresRemuneraciones }: FilaVariablesRemuneracionesProps) => {
	const [value, setValue] = useState(() => {
		return variable?.diasTrabajados ? "30" : "";
	});
	const { sueldoDiario } = useSueldo(); // usa el valor desde el contexto

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		if (/^\d*$/.test(newValue)) {
			setValue(newValue);
		}
	};

	const cantidad = value === "" ? 0 : parseInt(value, 10);

	const resultado = evaluate(variable.formula, {
		sueldoDiario,
		diasTrabajados: cantidad,
	});

	useEffect(() => {
		setValoresRemuneraciones((prev) => {
			const existe = prev.find((v) => v.id === variable.id);

			if (existe) {
				return prev.map((v) => (v.id === variable.id ? { id: variable.id, valor: resultado } : v));
			} else {
				return [...prev, { id: variable.id, valor: resultado }];
			}
		});
	}, [resultado, setValoresRemuneraciones, variable.id]);

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
					textAlign: "center",
				}}>
				<Box>
					<Typography variant="body2" sx={{ fontSize: { xs: 11, sm: 13 } }}>
						{variable.descripcion}
					</Typography>
				</Box>
				<Box>
					{variable?.cantidad ? (
						<TextField
							value={value}
							onChange={handleChange}
							placeholder="Cantidad"
							size="small"
							variant="outlined"
							sx={{
								width: { lg: 100 },
								"& .MuiInputBase-root": {
									height: 30,
									fontSize: { xs: 11, sm: 13 },
									padding: "0 8px",
								},
								"& input": {
									padding: "6px 0",
								},
							}}
						/>
					) : null}
				</Box>
				<Box>
					<Typography variant="body2" sx={{ fontSize: { xs: 11, sm: 13 } }}>
						{resultado.toFixed(2)}
					</Typography>
				</Box>
			</Box>
		</>
	);
};

export default FilaVariablesRemuneraciones;
