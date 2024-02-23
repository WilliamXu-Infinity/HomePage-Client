import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"

import Logo from "../../Asset/logos/w.png"
import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap"
import "./Navbar.sass"

const NavBar = ({ showMap, defaultPage }) => {
	const history = useHistory()
	const location = useLocation()

	const [activeKey, setActiveKey] = useState()

	const navbarMenu = []
	let defaultKey = 0

	Object.keys(showMap).map((menu) => {
		if (showMap[menu]) {
			navbarMenu.push({
				title: menu,
				url: `/${menu.toLowerCase()}`,
			})

			if (defaultPage === menu) defaultKey = navbarMenu.length - 1
		}
	})

	const onClickLogo = () => {
		history.push("/")
	}

	useEffect(() => {
		if (location.pathname === "/home" || location.pathname === "/")
			setActiveKey("/home")
		else setActiveKey(location.pathname)
	}, [location.pathname])

	return (
		<div className={"navContent"}>
			<Nav
				fill
				variant="pills"
				defaultActiveKey={defaultKey}
				className="nav-bar"
				activeKey={activeKey}
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
									eventKey={url}
									className="nav-item"
								>
									{title}
								</Nav.Link>
							</Nav.Item>
						)
					})}
				</div>
			</Nav>
		</div>
	)
}

export default NavBar
