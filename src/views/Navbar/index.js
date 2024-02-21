import React from "react"
import { useHistory, useLocation } from "react-router-dom"

import Logo from "../../Asset/logos/w.png"
import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap"
import "./Navbar.sass"

const NavBar = ({ showMap, defaultPage }) => {
	const history = useHistory()

	const navbarMenu = []
	let defaultKey = 0

	// Object.keys(showMap).map((menu) => {
	// 	if (showMap[menu]) {
	// 		navbarMenu.push({
	// 			title: menu,
	// 			url: `/${menu.toLowerCase()}`,
	// 		})

	// 		if (defaultPage === menu) defaultKey = navbarMenu.length - 1
	// 	}
	// })

	const onClickLogo = () => {
		history.push("/")
	}

	return (
		<>
			<Nav
				fill
				variant="pills"
				defaultActiveKey={defaultKey}
				className="nav-bar"
			>
				<img
					className="nameLogo"
					src={Logo}
					alt=""
					onClick={onClickLogo}
				/>
				<div className="navList">
					{navbarMenu.map(({ title, url }, key) => {
						return (
							<Nav.Item key={key}>
								<Nav.Link
									as={Link}
									to={url}
									eventKey={key}
									className="nav-item"
								>
									{title}
								</Nav.Link>
							</Nav.Item>
						)
					})}
				</div>
			</Nav>
		</>
	)
}

export default NavBar
