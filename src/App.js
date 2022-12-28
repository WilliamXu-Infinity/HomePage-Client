import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./views/Home";
import About from "./views/About";
import Chat from "./views/Chat";
import Suggestion from "./views/Suggestion";

export default function App({socket}) {
	return (
		<Router forceRefresh={false}>
			<div>
				<NavBar />

				<Switch>
					<Route path="/home">
						<Home />
					</Route>

					<Route path="/about">
						<About />
					</Route>

					<Route path="/chat">
						<Chat socket={socket}/>
					</Route>

					<Route path="/suggestion">
						<Suggestion />
					</Route>

					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
