import { Alert, Slide, Snackbar, type SnackbarCloseReason } from "@mui/material";
import React from "react";

type AlertasProps = {
	openAlert: boolean;
	setOpenAlert(openAlert: boolean): void;
	messageAlert: string;
	alertType: "success" | "error";
};

const Alertas = ({ openAlert, setOpenAlert, messageAlert, alertType }: AlertasProps) => {
	const handleClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
		if (reason === "clickaway") return;
		setOpenAlert(false);
	};

	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={openAlert}
				autoHideDuration={2000}
				onClose={handleClose}
				slots={{ transition: Slide }}>
				<Alert onClose={handleClose} severity={alertType} variant="filled" sx={{ width: "100%" }}>
					{messageAlert}
				</Alert>
			</Snackbar>
		</>
	);
};

export default Alertas;
