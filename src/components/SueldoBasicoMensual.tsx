import { Box, Button, TextField, Typography } from "@mui/material";

import React, { useState } from "react";
import Alertas from "./Alertas";
import StepTwo from "../assets/svg/StepTwo";
import { useSueldo } from "../context/SueldoContext";

const SueldoBasicoMensual = () => {
	const { sueldoDiario, setSueldoDiario } = useSueldo();

	const [value, setValue] = useState(() => {
		const sueldoMensual = sueldoDiario * 30;
		return sueldoMensual.toFixed(2);
	});
	const [openAlert, setOpenAlert] = useState(false);
	const [messageAlert, setMessageAlert] = useState("");
	const [alertType, setAlertType] = useState<"success" | "error">("success");

	const handleClick = (message: string, type: "success" | "error") => {
		setMessageAlert(message);
		setAlertType(type);
		setOpenAlert(true);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const regex = /^\d*\.?\d{0,2}$/; // hasta 2 decimales
		const val = e.target.value;
		if (val === "" || regex.test(val)) {
			setValue(val);
		}
	};

	const handleSubmit = (): void => {
		if (!value) {
			handleClick("Ingrese un valor válido.", "error");
			return;
		}

		const parsed = parseFloat(value);

		const sueldoDiario = parsed / 30;

		if (isNaN(sueldoDiario)) {
			handleClick("El valor ingresado no es un número válido.", "error");
			return;
		}

		setSueldoDiario(sueldoDiario);
		handleClick("Remuneración básica guardada correctamente.", "success");
	};

	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column", width: "100%", textAlign: "center", gap: 2 }}>
				<Box>
					<StepTwo sx={{ fontSize: 50, color: "primary.main" }} />
				</Box>
				<Box sx={{ textAlign: "center" }}>
					<Typography sx={{ fontWeight: "bolder" }}>Ingrese su remuneración básica mensual</Typography>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
					<TextField size="small" value={value} onChange={handleChange} inputMode="decimal" placeholder="0.00" />
					<Button onClick={handleSubmit} variant="contained">
						Ingresar
					</Button>
				</Box>
			</Box>
			<Alertas openAlert={openAlert} setOpenAlert={setOpenAlert} messageAlert={messageAlert} alertType={alertType} />
		</>
	);
};

export default SueldoBasicoMensual;
