import React, { useState, useEffect } from "react"
import "./index.sass"

// Public files
import selfImg from "../../../../Asset/img-0.png"
import resumeLogo from "../../../../Asset/logos/resume.webp"

// company logos
import linkedInLogo from "../../../../Asset/logos/linkedin.png"
import githubLogo from "../../../../Asset/logos/github.png"
import hiLogo from "../../../../Asset/hi.png"

const StringList = [
	"をちたはぬ3Xひoと153とにwる",
	"七tくよちQqH5しCかeせもゆ百",
	"ろふたけ2tぬy九か4cあけやrろ",
	"うoえ六のjかは9れD5りxゆ5お",
	"YはqるI4jlつAdeぬも1やS",
	"わもw亿ちhてw三DうYjちかてA",
	"SXgこせたなGみe五wpけ0GC",
	"Soれ百8ゆみidXたよ万Qeeつ",
	"Sofあ7KReしutやたる九りぬ",
	"SoftoxtW4六ua四H四dS",
	"SoftwつyくかいA75万よすS",
	"SoftwarWえVこw六5九はW",
	"SoftwarとC亿けくxi3Jゆ",
	"Software3かv二oほ四0x",
	"Software ちN2八pHあく",
	"Software EIbいむんきJ",
	"Software EnjPsS万め",
	"Software Engま十Fたd",
	"Software EngiSHaP",
	"Software Engind二た",
	"Software EngineEな",
	"Software Engineeち",
	"Software Engineer",
]

const Intro = () => {
	const [isHovered, setIsHovered] = useState(false)
	const [testString, setTestString] = useState("")

	useEffect(() => {
		let count = 0
		const interval = setInterval(() => {
			setTestString(StringList[count])
			if (++count >= StringList.length) clearInterval(interval)
		}, 80)

		return () => clearInterval(interval)
	}, [])

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
				<p className="text1 js-scroll slide-top">
					{testString}
					<img className="hiLogo" src={hiLogo} alt="hi" />
				</p>

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
