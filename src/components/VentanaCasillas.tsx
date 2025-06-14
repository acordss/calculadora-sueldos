import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Checkbox, Divider, FormControlLabel, FormGroup, Typography } from "@mui/material";
import variablesRemuneraciones from "../json/variables-remuneraciones.json";
import variablesDescuentos from "../json/variables-descuentos.json";
import type { Variables } from "../interfaces/variables";

type VentanaCasillasProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	tipo: string;
};

const VentanaCasillas = ({ open, setOpen, tipo }: VentanaCasillasProps) => {
	const [items, setItems] = useState<Variables[]>();

	const [seleccion, setSeleccion] = useState<{ [key: string]: boolean }>({});

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setSeleccion((prev) => ({ ...prev, [name]: checked }));
	};

	useEffect(() => {
		if (tipo === "remuneraciones") {
			setItems(variablesRemuneraciones);
		} else {
			setItems(variablesDescuentos);
		}
	}, [tipo]);

	useEffect(() => {
		if (!items) return;

		const key = tipo === "remuneraciones" ? "variablesRemuneraciones" : "variablesDescuentos";
		const stored = localStorage.getItem(key);

		let seleccionados: Variables[] = [];

		if (stored && stored !== "undefined") {
			try {
				seleccionados = JSON.parse(stored);
			} catch (err) {
				console.error("Error al parsear datos del localStorage:", err);
			}
		}

		const seleccionadosSet = new Set(seleccionados.map((s) => s.nombre));

		const estadoInicial = Object.fromEntries(
			items.map((item) => [item.nombre, item.obligatoria || seleccionadosSet.has(item.nombre)])
		);

		setSeleccion(estadoInicial);
	}, [items, tipo]);

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Dialog
				maxWidth="md"
				fullWidth
				open={open}
				onClose={handleClose}
				slotProps={{
					paper: {
						component: "form",
						onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
							event.preventDefault();
							const seleccionados = Object.entries(seleccion)
								.filter(([_, marcado]) => marcado)
								.map(([nombre]) => items?.find((item) => item.nombre === nombre))
								.filter((item): item is Variables => item !== undefined);
							if (tipo === "remuneraciones") {
								localStorage.setItem("variablesRemuneraciones", JSON.stringify(seleccionados));
								window.dispatchEvent(new Event("remuneracionesActualizadas")); // << evento personalizado
							} else {
								localStorage.setItem("variablesDescuentos", JSON.stringify(seleccionados));
								window.dispatchEvent(new Event("descuentosActualizados"));
							}
							handleClose();
						},
					},
				}}>
				<DialogTitle>Elección de {tipo}</DialogTitle>
				<DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<DialogContentText>Por favor, seleccione los tipos a considerar en el cálculo</DialogContentText>
					<Divider />
					<FormGroup
						sx={{
							display: "grid",
							gridTemplateColumns: { sm: "repeat(4,1fr)" },
							justifyContent: "center",
						}}>
						{items?.map((item) => (
							<FormControlLabel
								key={item.id}
								control={
									<Checkbox
										size="small"
										disabled={item.obligatoria}
										checked={seleccion[item.nombre] || false}
										name={item.nombre}
										onChange={handleCheckboxChange}
									/>
								}
								label={<Typography fontSize={13}>{item.descripcion}</Typography>}
							/>
						))}
					</FormGroup>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit">Subscribe</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default VentanaCasillas;
