import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./About.sass"

function About() {
	// let myRef = useRef(null)
	// document.addEventListener("click", () => console.log(3))

	// useEffect(() => {
	// 	// 获取 DOM 元素
	// 	const element = myRef.current

	// 	// 添加事件监听器
	// 	myRef.addEventListener("click", () => console.log(2))

	// 	// 在组件卸载时移除事件监听器
	// 	return () => {
	// 		if (element) {
	// 			element.removeEventListener("click", () => console.log(4))
	// 		}
	// 	}
	// }, [])

	return (
		<>
			<main>
				<h2>Who are we?</h2>
				<p>That feels like an existential question, don't you think?</p>
				<button
					onClick={() => {
						console.log("1")
					}}
					// ref={myRef}
				>
					Click
				</button>
			</main>
			<nav>
				<Link to="/">Home</Link>
			</nav>
		</>
	)
}

export default About
