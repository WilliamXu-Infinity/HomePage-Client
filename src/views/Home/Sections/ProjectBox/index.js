import React from "react"
import "./index.sass"
import projectData from "../../../../Asset/texts/projectInfo.json"
import SectionHeader from "../SectionHeader"

const ProjectBox = ({}) => {
	const projectList = projectData.projects
    const url = window.location.origin
    const logoList = projectList.map(p => p.companyLogo)
    
	return (
		<>
            <SectionHeader title="Project" logoList={logoList}/>
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
                        <div className="dashedLine"></div>
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
									src={url + imgUrl}
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