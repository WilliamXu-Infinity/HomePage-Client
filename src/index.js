import React from "react"
import ReactDOM from "react-dom"
import { BrowserRoute, HashRouter } from "react-router-dom"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"
import { CookiesProvider } from "react-cookie"
import { io } from "socket.io-client"

const showMapPublic = {
	Home: true,
	About: false,
	Suggestion: false,
	SnackGame: false,
	Chat: false,
	ShareNotes: false,
	ToolsPage: false,
	VisaCheck: false,
	RPC: false,
	Login: false,
}

const showMap = {
	Home: true,
	About: true,
	Suggestion: false,
	SnackGame: true,
	Chat: false,
	ShareNotes: true,
	ToolsPage: false,
	VisaCheck: true,
	RPC: true,
	Login: false,
}

const defaultPage = "Home"

const socket = showMap.Chat ? io("http://localhost:3001") : null

ReactDOM.render(
	<CookiesProvider>
		<HashRouter>
			<App
				socket={socket}
				showMap={showMapPublic}
				defaultPage={defaultPage}
			/>
		</HashRouter>
	</CookiesProvider>,
	document.getElementById("root")
)

reportWebVitals()
