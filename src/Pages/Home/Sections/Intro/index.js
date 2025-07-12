import { useState, useEffect } from "react"
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
	"Sをちたはぬ3Xひoと153とにwる",
  "Se七tくよちQqH5しCかeせもゆ百",
  "Senろふたけ2tぬy九か4cあけやrろ",
  "Seniうoえ六のjかは9れD5りxゆ5お",
  "SenioYはqるI4jlつAdeぬも1やS",
  "Seniorわもw亿ちhてw三DうYjちかて",
  "Senior SXgこせたなGみe五wpけ0GC",
  "Senior Soれ百8ゆみidXたよ万Qeeつ",
  "Senior Sofあ7KReしutやたる九りぬ",
  "Senior SoftoxtW4六ua四H四dS",
  "Senior SoftwつyくかいA75万よすS",
  "Senior SoftwarWえVこw六5九はW",
  "Senior SoftwarとC亿けくxi3Jゆ",
  "Senior Software3かv二oほ四0x",
  "Senior Software ちN2八pHあく",
  "Senior Software EIbいむんき",
  "Senior Software EnjPsS万め",
  "Senior Software Engま十Fたd",
  "Senior Software EngiSHaP",
  "Senior Software Engind二た",
  "Senior Software EngineEな",
  "Senior Software Engineeち",
  "Senior Software Engineer"
]

const Intro = () => {
	const [isHovered, setIsHovered] = useState(false)
	const [titleString, setTilteString] = useState("")

	useEffect(() => {
		let count = 0
		const interval = setInterval(() => {
			setTilteString(StringList[count])
			if (++count >= StringList.length) clearInterval(interval)
		}, 80)

		return () => clearInterval(interval)
	}, [])

	const handleDownload = () => {
		const url = window.location.origin + "/TingchaoXu_Resume.pdf"
		const link = document.createElement("a")
		link.href = url
		link.setAttribute("download", "TingchaoXu_Resume.pdf")
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
				<p className="title-string">
					{titleString}
					<img className="hiLogo" src={hiLogo} alt="hi" />
				</p>

				<p>{"Hi, my name is Tingchao (William) Xu."}</p>
				<p>A passionate Senior Software Engineer based in CA.</p>
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
