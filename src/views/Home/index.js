import React, { useState } from "react"
import ProjectBox from "./Sections/ProjectBox"
import "./Home.sass"

// Public files
import selfImg from "../../Asset/img-0.png"
import resumeLogo from "../../Asset/logos/resume.webp"

// company logos
import linkedInLogo from "../../Asset/logos/linkedin.png"
import githubLogo from "../../Asset/logos/github.png"
import htmlLogo from "../../Asset/logos/html.png"
import nodeLogo from "../../Asset/logos/node.png"
import reactLogo from "../../Asset/logos/react.png"
import sassLogo from "../../Asset/logos/sass.png"
import javascriptLogo from "../../Asset/logos/javascript.png"
import mongodbLogo from "../../Asset/logos/mongodb.svg"
import vueLogo from "../../Asset/logos/vue.png"
import mysqlLogo from "../../Asset/logos/mysql.png"
import cssLogo from "../../Asset/logos/css.png"

function Home() {
	const handleDownload = () => {
		const url = "http://localhost:3000/TingchaoXu_Resume_2024.pdf"
		const link = document.createElement("a")
		link.href = url
		link.setAttribute("download", "TingchaoXu_Resume_2024.pdf")
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const [isHovered, setIsHovered] = useState(false)

	const handleMouseEnter = () => {
		setIsHovered(true)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
	}

	return (
		<div className="content">
			<section className="introContent">
				<div className="describeSection">
					<p className="text1">Front end developer</p>
					<p>{"Hi, my name is Tingchao (William) Xu."}</p>
					<p>A passionate Front-end developer based in LA.</p>
					<div className="companyLogos">
						<div className="logoBox">
							<img
								className="companyLogo"
								src={resumeLogo}
								alt="Resume"
								onClick={handleDownload}
							/>
							<p
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							>
								{isHovered ? "Download" : "Resume"}
							</p>
						</div>

						<div className="logoBox">
							<a
								href="https://www.linkedin.com/in/tingchao-xu-2b49a491/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									className="companyLogo"
									src={linkedInLogo}
									alt=""
								/>
							</a>
							<p>LinkedIn</p>
						</div>

						<div className="logoBox">
							<a
								href="https://github.com/WilliamXu-Infinity"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									className="companyLogo"
									src={githubLogo}
									alt=""
								/>
							</a>
							<p>Github</p>
						</div>
					</div>
				</div>
				<img className="selfPhoto" src={selfImg} alt="" />
			</section>

			<section className="techStackSection">
				<p className="text2">Tech Stack</p>
				<div className="vLine"></div>
				<div className="skillLogos">
					<img className="logoImg" src={reactLogo} alt="React" />
					<img className="logoImg" src={vueLogo} alt="Vue" />
					<img
						className="logoImg"
						src={javascriptLogo}
						alt="Javascript"
					/>
					<img className="logoImg" src={htmlLogo} alt="HTML" />
					<img className="logoImg" src={nodeLogo} alt="Nodejs" />
					<img className="logoImg" src={cssLogo} alt="CSS" />
					<img className="logoImg" src={sassLogo} alt="Sass" />
					<img className="logoImg" src={mongodbLogo} alt="MongoDB" />
					<img className="logoImg" src={mysqlLogo} alt="MySQL" />
				</div>
			</section>
			<p className="text3">Projects</p>
			<ProjectBox />
		</div>
	)
}

export default Home
