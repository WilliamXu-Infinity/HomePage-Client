import React from "react"
import { useHistory } from "react-router-dom"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { io } from 'socket.io-client';

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

export default function App({ socket }) {
	const history = useHistory()
	history.push(`/${defaultPage.toLowerCase()}`)

    const showMap = {
        Home: true,
        About: false,
        Suggestion: false,
        SnackGame: true,
        Chat: false,
        ShareNotes: true,
        ToolsPage: false,
        VisaCheck: true,
        RPC: true,
        Login: false
      }
      
      const defaultPage = "Home"
      
      const socket = showMap.Chat ? io('http://localhost:3001') : null

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

                    {showMap.Login && (
						<Route path="/login">
							<Login />
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
