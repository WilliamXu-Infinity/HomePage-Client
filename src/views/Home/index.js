import React from "react"
import Intro from "./Sections/Intro"
import TechStack from "./Sections/TechStack"
import Education from "./Sections/Education"
import ProjectBox from "./Sections/ProjectBox"
import "./Home.sass"

function Home() {
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
