import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import NavBar from "./Pages/Navbar"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Chat from "./Pages/Chat"
import Suggestion from "./Pages/Suggestion"
import SnackGame from "./Pages/SnackGame"
import ShareNotes from "./Pages/ShareNotes"
import ToolsPage from "./Pages/ToolsPage"
import VisaCheck from "./Pages/VisaCheck"
import Login from "./Pages/Login"
import RPC from "./Pages/RPC"
import PageNotFound from "./Pages/404"
import FreshMemory from "./Pages/FreshMemory"
import JumpingButton from "./Pages/Components/JumpingButton"
import SystemDesignPage from "./Pages/SystemDesignPage"
import { io } from "socket.io-client"
import "./App.sass"

const DevelopMode = false

export default function App() {
    const [backgroundColor, setBackgroundColor] = useState('white');
    const defaultPage = "Home"

    // const socket = DevelopMode ? io("http://localhost:3001") : null

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setBackgroundColor('black');
        }, 3000);
    
        return () => clearTimeout(timeoutId);
      }, []);

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

    const routeMap = [
        {
            path: "/",
            component: Home,
            title: "Home",
            show: true
        },
        {
            path: "/home",
            component: Home,
            title: "Home",
            show: true
        },
        {
            path: "/about",
            component: About,
            title: "About",
            show: DevelopMode
        },
        // {
        //     path: "/chat",
        //     component: Chat,
        //     title: "Chat",
        //     show: DevelopMode,
        //     props: { socket }
        // },
        {
            path: "/snackgame",
            component: SnackGame,
            title: "SnackGame",
            show: DevelopMode
        },
        {
            path: "/suggestion",
            component: Suggestion,
            title: "Suggestion",
            show: DevelopMode
        },
        {
            path: "/sharenotes",
            component: ShareNotes,
            title: "ShareNotes",
            show: DevelopMode
        },
        {
            path: "/toolspage",
            component: ToolsPage,
            title: "ToolsPage",
            show: DevelopMode
        },
        {
            path: "/visacheck",
            component: VisaCheck,
            title: "VisaCheck",
            show: DevelopMode
        },
        {
            path: "/freshmemory",
            component: FreshMemory,
            title: "FreshMemory",
            show: DevelopMode
        },
        {
            path: "/RPC",
            component: RPC,
            title: "RPC",
            show: DevelopMode
        },
        {
            path: "/login",
            component: Login,
            title: "Login",
            show: DevelopMode
        },
        {
            path: "/jumpingbutton",
            component: JumpingButton,
            title: "JumpingButton",
            show: DevelopMode
        },
        {
            path: "/systemdesignpage",
            component: SystemDesignPage,
            title: "SystemDesignPage",
            show: DevelopMode
        }
    ];

	return (
		<div className={`transition-background ${backgroundColor}`}>
			<NavBar routeMap={routeMap} defaultPage={defaultPage} />		

            <Switch>
                {routeMap.map((route, index) => 
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
		</div>
	)
}
