import React, { useState } from "react"
import './index.sass'
// Public files
import selfImg from "../../../../Asset/img-0.png"
import resumeLogo from "../../../../Asset/logos/resume.webp"

// company logos
import linkedInLogo from "../../../../Asset/logos/linkedin.png"
import githubLogo from "../../../../Asset/logos/github.png"

const Intro = () => {
	const [isHovered, setIsHovered] = useState(false)

	const handleDownload = () => {
		const url = window.location.origin + "/TingchaoXu_Resume_2024.pdf"
		const link = document.createElement("a")
		link.href = url
		link.setAttribute("download", "TingchaoXu_Resume_2024.pdf")
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const handleMouseEnter = () => {
		setIsHovered(true)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
	}

	return (
		<section className="introContent">
			<div className="describeSection">
				<p className="text1 js-scroll slide-top">Software Engineer</p>
				<p>{"Hi, my name is Tingchao (William) Xu."}</p>
				<p>A passionate Software Engineer based in LA.</p>
				<div className="companyLogos">
					<div
						className="logoBox"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<img
							className="companyLogo"
							src={resumeLogo}
							alt="Resume"
							onClick={handleDownload}
						/>
						<p>{isHovered ? "Download" : "Resume"}</p>
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
	)
}

export default Intro
