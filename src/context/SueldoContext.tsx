import { createContext, useContext, useState, type ReactNode } from "react";

type SueldoContextType = {
	sueldoDiario: number;
	setSueldoDiario: (valor: number) => void;
	totalRemuneraciones: number;
	setTotalRemuneraciones: (valor: number) => void;
	totalDescuentos: number;
	setTotalDescuentos: (valor: number) => void;
};

const SueldoContext = createContext<SueldoContextType | undefined>(undefined);

export const SueldoProvider = ({ children }: { children: ReactNode }) => {
	const [sueldoDiario, setSueldoDiarioState] = useState(() => {
		const stored = localStorage.getItem("sueldoDiario");
		return stored ? parseFloat(stored) : 0;
	});

	const [totalRemuneraciones, setTotalRemuneracionesState] = useState(() => {
		const stored = localStorage.getItem("totalRemuneraciones");
		return stored ? parseFloat(stored) : 0;
	});

	const [totalDescuentos, setTotalDescuentosState] = useState(() => {
		const stored = localStorage.getItem("totalDescuentos");
		return stored ? parseFloat(stored) : 0;
	});

	const setSueldoDiario = (valor: number) => {
		localStorage.setItem("sueldoDiario", valor.toString());
		setSueldoDiarioState(valor);
	};

	const setTotalRemuneraciones = (valor: number) => {
		localStorage.setItem("totalRemuneraciones", valor.toString());
		setTotalRemuneracionesState(valor);
	};

	const setTotalDescuentos = (valor: number) => {
		localStorage.setItem("totalDescuentos", valor.toString());
		setTotalDescuentosState(valor);
	};

	return (
		<SueldoContext.Provider
			value={{
				sueldoDiario,
				setSueldoDiario,
				totalRemuneraciones,
				setTotalRemuneraciones,
				totalDescuentos,
				setTotalDescuentos,
			}}>
			{children}
		</SueldoContext.Provider>
	);
};

export const useSueldo = () => {
	const context = useContext(SueldoContext);
	if (!context) throw new Error("useSueldo debe usarse dentro de SueldoProvider");
	return context;
};
