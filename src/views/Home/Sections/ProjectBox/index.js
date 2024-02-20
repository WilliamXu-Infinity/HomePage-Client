import React from "react"
import "./ProjectBox.sass"
import projectData from "../../../../Asset/texts/projectInfo.json"

const ProjectBox = ({}) => {
	const projectList = projectData.projects

	return (
		<>
			{projectList.map((project, index) => {
				const {
					companyName,
					duration,
					imgUrl,
					description,
					companyLogo,
				} = project
				return (
					<section className="projectSection" key={index}>
                        <div class="dashedLine"></div>
						<div className="projectContent">
							<div className="projectHead">
								<div className="leftContent">
									<img
										className="projectCompanyLogo"
										src={companyLogo}
										alt="Autodesk"
									/>
									<p className="text4">{companyName}</p>
								</div>
								<div className="rightContent">
									<p>{duration}</p>
								</div>
							</div>
							<div className="projectContent">
								<img
									className="projectImg"
									src={imgUrl}
									alt="ProjectImg"
								/>
								<ul>
									{description.map((text, index) => {
										return <li key={index}>{text}</li>
									})}
								</ul>
							</div>
						</div>
					</section>
				)
			})}
		</>
	)
}

export default ProjectBox
