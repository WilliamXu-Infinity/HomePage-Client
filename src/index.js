import React from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
import reportWebVitals from "./reportWebVitals"
import App from "./App"
import './tailwind.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { CookiesProvider } from "react-cookie"

ReactDOM.render(
	<CookiesProvider>
		<HashRouter>
			<App/>
		</HashRouter>
	</CookiesProvider>,
	document.getElementById("root")
)

reportWebVitals()
