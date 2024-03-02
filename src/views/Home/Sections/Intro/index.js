import React, { useState, useEffect } from "react"
import "./index.sass"

// Public files
import selfImg from "../../../../Asset/img-0.png"
import resumeLogo from "../../../../Asset/logos/resume.webp"

// company logos
import linkedInLogo from "../../../../Asset/logos/linkedin.png"
import githubLogo from "../../../../Asset/logos/github.png"
import hiLogo from "../../../../Asset/hi.png"

function generateStrings(numberOfString, count, string) {
	const stringLength = string.length - count
	const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" // 英文字母
	const chineseCharacters = "一二三四五六七八九十百千万亿" // 中文字符
	const japaneseCharacters =
		"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん" // 日文字符
	const numbers = "0123456789" // 数字
	const charMap =
		characters + chineseCharacters + japaneseCharacters + numbers

	let strings = []

	for (let i = 0; i < numberOfString; i++) {
		let randomString = ""
		for (let j = 0; j < stringLength; j++) {
			const randomChar = charMap.charAt(
				Math.floor(Math.random() * charMap.length)
			)
			randomString += randomChar
		}
		strings.push(string.slice(0, count) + randomString)
	}

	return strings
}

const Intro = () => {
	const [isHovered, setIsHovered] = useState(false)
	const [testString, setTestString] = useState("XXXXXXXXXXXX")

	useEffect(() => {
		let count = 0,
			waitTimes = 5
		const string = "Software Engineer"
		const interval = setInterval(() => {
			const strings = generateStrings(1, count, string)
			setTestString(strings[0])
			if (waitTimes > 0) {
				waitTimes--
			} else count++
			if (count > string.length) clearInterval(interval)
		}, 60)

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
				<p className="text1 js-scroll slide-top">{testString}
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
