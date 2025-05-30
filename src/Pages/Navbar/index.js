import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"

import Logo from "../../Asset/logos/w.png"
import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap"
import "./Navbar.sass"

const NavBar = ({ routeMap, defaultPage }) => {
	const history = useHistory()
	const location = useLocation()

	const [activeKey, setActiveKey] = useState()
    const [navbarMenu, setNavBarMenu] = useState([])
	const defaultKey = 0

    useEffect(() => {
        const menu = routeMap
            .filter(routObj => {
                return routObj.path !== '/' && routObj.show
            })
            .map(routObj => {
                return {
                    title: routObj.title,
                    url: `/${routObj.title.toLowerCase()}`,
                }
        })

        setNavBarMenu(menu)
    }, [])

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
