import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../style/Navbar.sass";

const NavBar = ({showMap, defaultPage}) => {
  const navbarMenu = []
  let defaultKey = 0
  Object.keys(showMap).map(menu => {
    if (showMap[menu]) {
      
      navbarMenu.push({
        title: menu,
        url: `/${menu.toLowerCase()}`
      })

      if (defaultPage === menu) defaultKey = navbarMenu.length - 1
    }
  })

  return (
		<>
			<Nav fill variant="pills" defaultActiveKey={defaultKey} className="nav-bar">
				{navbarMenu.map(({ title, url }, key) => {
					return (
						<Nav.Item key={key}>
							<Nav.Link as={Link} to={url} eventKey={key} className="nav-item">
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
