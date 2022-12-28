import React from "react";
import { Link } from "react-router-dom";

import { Nav } from "react-bootstrap";
import "../style/Navbar.sass";
import navbarMenu from "./NavbarMenu";

const NavBar = () => {
	return (
		<>
			<Nav fill variant="pills" defaultActiveKey="0">
				{navbarMenu.map(({ title, url }, key) => {
					return (
						<Nav.Item key={key}>
							<Nav.Link as={Link} to={url} eventKey={key}>
								{title}
							</Nav.Link>
						</Nav.Item>
					);
				})}
			</Nav>
		</>
	);
};

export default NavBar;
