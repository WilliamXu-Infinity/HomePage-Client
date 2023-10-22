import React from "react"
import { useHistory } from "react-router-dom"
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
import RPC from "./Views/RPC"

export default function App({ socket, showMap, defaultPage }) {
	const history = useHistory()
	history.push(`/${defaultPage.toLowerCase()}`)

	return (
		<Router forceRefresh={false}>
			<div>
				<NavBar showMap={showMap} defaultPage={defaultPage} />

				<Switch>
					{showMap.Home && (
						<Route path="/home">
							<Home />
						</Route>
					)}

					{showMap.About && (
						<Route path="/about">
							<About />
						</Route>
					)}

					{showMap.Chat && (
						<Route path="/chat">
							<Chat socket={socket} />
						</Route>
					)}

					{showMap.SnackGame && (
						<Route path="/snackgame">
							<SnackGame />
						</Route>
					)}

					{showMap.Suggestion && (
						<Route path="/suggestion">
							<Suggestion />
						</Route>
					)}

                    {showMap.ShareNotes && (
						<Route path="/sharenotes">
							<ShareNotes />
						</Route>
					)}

                    {showMap.ToolsPage && (
						<Route path="/toolspage">
							<ToolsPage />
						</Route>
					)}

                    {showMap.VisaCheck && (
						<Route path="/visacheck">
							<VisaCheck />
						</Route>
					)}

                    {showMap.RPC && (
						<Route path="/RPC">
							<RPC />
						</Route>
					)}

					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}
