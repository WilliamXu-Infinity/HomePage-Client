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
		title: "Languages",
		skills: [
			"JavaScript",
			"TypeScript",
            "Python",
			"Java",
			"HTML",
			"CSS3",
			"ES6",
		],
	},
	{
		title: "Front-End",
		skills: ["React", "Redux", "Next.js", "Vue", "Vuex", "React-Native", "Node.js", "Express", "Three.js", "D3.js"],
	},
	{
		title: "Back-End",
		skills: ["MongoDB", "Redis", "MySQL", "Restful API", "GraphQL"],
	},
    {
        title: "Cloud & Testing",
        skills: ["AWS", "Unit Test", "End-End Test", "Integration Testing"]
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
						<div className="listTitle">{title}:</div>
						{skills.map((skill, i) => {
							return (
								<div key={i} className="skillBox">
                  <div className="vLine"></div>
									<p className="listSkill">
										{skill}
									</p>
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
