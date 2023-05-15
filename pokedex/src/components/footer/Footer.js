import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import "./Footer.css";

export function Footer() {
	return (
		<Box className="footer">
			<Box
				className="footer-container"
				component="footer"
				sx={{
					py: 3,
					px: 1,
					mt: "auto",
				}}
			>
				<Container maxWidth="100%">
					<Typography variant="body1">Pokedex</Typography>
					<Typography variant="body2" color="text.secondary">
						Miguel Díaz
					</Typography>
				</Container>
			</Box>
		</Box>
	);
}
