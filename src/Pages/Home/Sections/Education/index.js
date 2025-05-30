import React from "react"
import "./index.sass"

import SectionHeader from '../SectionHeader'
import universityLogo from "../../../../Asset/logos/UniversityOfArizonaLogo.jpeg"

const Education = () => {
	return (
		<section className="educationSection">
            <SectionHeader title="Education" logoList={[universityLogo]}/>
			<div className="dashedLine"></div>
			<p>University of Arizona - CS Bachelor Degree (2017)</p>
		</section>
	)
}

export default Education
