import React from "react"
import "./index.sass"
import SectionHeader from "../SectionHeader"

import htmlLogo from "../../../../Asset/logos/html.png"
import nodeLogo from "../../../../Asset/logos/node.png"
import reactLogo from "../../../../Asset/logos/react.png"
import sassLogo from "../../../../Asset/logos/sass.png"
import javascriptLogo from "../../../../Asset/logos/javascript.png"
import mongodbLogo from "../../../../Asset/logos/mongodb.svg"
import vueLogo from "../../../../Asset/logos/vue.png"
import mysqlLogo from "../../../../Asset/logos/mysql.png"
import cssLogo from "../../../../Asset/logos/css.png"
import reactQueryLogo from "../../../../Asset/logos/reactquery.png"
import typeScriptLogo from "../../../../Asset/logos/typescript.png"


const TackStack = [
	{
		title: "Front-End",
		skills: [
			"React",
			"React-Native",
            "React-Query",
			"Vue",
			"Redux",
			"Vuex",
			"JavaScript",
            "TypeScript",
			"HTML",
			"CSS3",
			"Sass/Less",
			"Bootstrip",
		],
	},
	{
		title: "Back-End",
		skills: ["Node.js", "Python", "Express", "RESTful API", "GraphQL"],
	},
	{
		title: "Database",
		skills: ["MongoDB", "MySQL", "SQL", "Redis"],
	},
]

const LogoList = [
	reactLogo,
	vueLogo,
	javascriptLogo,
    typeScriptLogo,
	htmlLogo,
	nodeLogo,
	cssLogo,
	sassLogo,
	mongodbLogo,
	mysqlLogo,
    reactQueryLogo
]

const TechStack = () => {
	return (
		<section className="techStackSection">
			<SectionHeader title="Tech Stack" logoList={LogoList} />
			<div className="dashedLine"></div>
			{TackStack.map((list, index) => {
				const { title, skills } = list
				return (
					<div key={index} className="techStackList">
						<p className="listTitle">{title}:</p>
						{skills.map((skill, i) => {
							return (
								<div key={i} className="skillBox">
									<p className="listSkill">
										{skill}
									</p>
									<div className="vLine"></div>
								</div>
							)
						})}
					</div>
				)
			})}
		</section>
	)
}

export default TechStack
