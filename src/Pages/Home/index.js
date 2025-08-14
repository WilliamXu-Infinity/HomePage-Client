import React, { useEffect } from "react"
import Intro from "./Components/Intro"
import TechStack from "./Components/TechStack"
import Education from "./Components/Education"
import ProjectBox from "./Components/ProjectBox"
import axios from 'axios'
import "./Home.sass"

function Home() {
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				"https://william-xu-home-page-c5cbdc316c00.herokuapp.com/"
	// 			)
	// 			const data = await response.data
	// 		} catch (error) {
	// 			console.log(
	// 				"\x1b[31m%s\x1b[0m",
	// 				`WX - error: ${JSON.stringify(error)}`
	// 			)
	// 		}
	// 	}

	// 	fetchData()
	// }, [])

	return (
		<div className="content">
			<div className="contentBox">
				<Intro />
				<TechStack />
				<Education />
				<ProjectBox />
			</div>
		</div>
	)
}

export default Home
