import { Box } from "@mui/material";
import CenterSideBody from "./CenterSideBody";
import LeftSideBody from "./LeftSideBody";
import RightSideBody from "./RightSideBody";

const BodyLayout = () => {
	return (
		<>
			<Box sx={{ display: "flex", pb: 6, p: { xs: 2 } }}>
				<LeftSideBody />
				<CenterSideBody />
				<RightSideBody />
			</Box>
		</>
	);
};

export default BodyLayout;
