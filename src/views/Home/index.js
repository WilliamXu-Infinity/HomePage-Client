import React from "react"
import selfImg from "../../Asset/img-0.png"
import resumeLogo from "../../Asset/logos/resume.png"
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

import "./Home.sass"

function Home() {
	const handleDownload = () => {
		const url = "http://localhost:3000/TingchaoXu_Resume_2024.pdf" // 替换为你的PDF文件路径
		const link = document.createElement("a")
		link.href = url
		link.setAttribute("download", "TingchaoXu_Resume_2024.pdf") // 设置下载的文件名
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<div className="content">
			<div className="introContent">
				<div className="selfDescribe">
					<p className="text1">Front end developer</p>
					<p>{"Hi, my name is Tingchao (William) Xu."}</p>
					<p>A passionate Front-end developer based in LA.</p>
					<div className="companyLogos">
                        <img className="companyLogo" src={resumeLogo} alt="Resume" onClick={handleDownload}/>
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
						<a
							href="https://github.com/WilliamXu-Infinity"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img className="companyLogo" src={githubLogo} alt="" />
						</a>
					</div>
				</div>
				<img className="selfPhoto" src={selfImg} alt="" />
			</div>

			<div className="techStack">
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
			</div>
		</div>
	)
}

export default Home
