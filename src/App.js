import React, { useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import NavBar from "./Views/Navbar"
import Home from "./Views/Home"
import About from "./Views/About"
import Chat from "./Views/Chat"
import Suggestion from "./Views/Suggestion"
import SnackGame from "./Views/SnackGame"
import ShareNotes from "./Views/ShareNotes"
import ToolsPage from "./Views/ToolsPage"
import VisaCheck from "./Views/VisaCheck"
import Login from "./Views/Login"
import RPC from "./Views/RPC"
import PageNotFound from "./Views/404"
import FreshMemory from "./Views/FreshMemory"
import JumpingButton from "./Views/Components/JumpingButton"

export default function App({ socket, showMap, defaultPage }) {
	const history = useHistory()
	const location = useLocation()

	// useEffect(() => {
	// 	const currentUrl = window.location.origin
	// 	const links = document.querySelectorAll('link[rel="icon"]')
	// 	links.forEach((link) => {
	// 		const originalHref = link.getAttribute("href")
	// 		const newHref = originalHref.replace(
	// 			"http://localhost:3000",
	// 			currentUrl
	// 		)
	// 		link.setAttribute("href", newHref)
	// 	})
	// }, [])

	// console.log('\x1b[31m%s\x1b[0m', 'WX - check - App')

    const routes = [
        { path: "/home", component: Home, show: showMap.Home },
        { path: "/about", component: About, show: showMap.About },
        { path: "/chat", component: Chat, show: showMap.Chat, props: { socket } },
        { path: "/snackgame", component: SnackGame, show: showMap.SnackGame },
        { path: "/suggestion", component: Suggestion, show: showMap.Suggestion },
        { path: "/sharenotes", component: ShareNotes, show: showMap.ShareNotes },
        { path: "/toolspage", component: ToolsPage, show: showMap.ToolsPage },
        { path: "/visacheck", component: VisaCheck, show: showMap.VisaCheck },
        { path: "/freshmemory", component: FreshMemory, show: showMap.FreshMemory },
        { path: "/RPC", component: RPC, show: showMap.RPC },
        { path: "/login", component: Login, show: showMap.Login },
        { path: "/", component: Home, show: showMap},
        { path: "/jumpingbutton", component: JumpingButton, show: true}
    ];

	return (
		<>
			<NavBar showMap={showMap} defaultPage={defaultPage} />		

            <Switch>
                {routes.map((route, index) => 
                    route.show && (
                    <Route key={index} exact path={route.path} {...route.props}>
                        <route.component />
                    </Route>
                    )
                )}
                <Route>
                    <PageNotFound />
                </Route>
            </Switch>
		</>
	)
}
