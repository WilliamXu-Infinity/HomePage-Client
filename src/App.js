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

	return (
		<>
			<NavBar showMap={showMap} defaultPage={defaultPage} />

			<Switch>
				{showMap.Home && (
					<Route exact path="/home">
						<Home />
					</Route>
				)}

				{showMap.About && (
					<Route exact path="/about">
						<About />
					</Route>
				)}

				{showMap.Chat && (
					<Route exact path="/chat">
						<Chat socket={socket} />
					</Route>
				)}

				{showMap.SnackGame && (
					<Route exact path="/snackgame">
						<SnackGame />
					</Route>
				)}

				{showMap.Suggestion && (
					<Route exact path="/suggestion">
						<Suggestion />
					</Route>
				)}

				{showMap.ShareNotes && (
					<Route exact path="/sharenotes">
						<ShareNotes />
					</Route>
				)}

				{showMap.ToolsPage && (
					<Route exact path="/toolspage">
						<ToolsPage />
					</Route>
				)}

				{showMap.VisaCheck && (
					<Route exact path="/visacheck">
						<VisaCheck />
					</Route>
				)}

				{showMap.RPC && (
					<Route exact path="/RPC">
						<RPC />
					</Route>
				)}

				{showMap.Login && (
					<Route exact path="/login">
						<Login />
					</Route>
				)}

				<Route exact path="/" component={Home}>
					<Home />
				</Route>

				<Route>
					<PageNotFound />
				</Route>
			</Switch>
		</>
		// </Router>
	)
}
