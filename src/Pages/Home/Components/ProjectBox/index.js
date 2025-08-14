import "./index.sass"
import projectData from "../../../../Asset/texts/projectInfo.json"
import SectionHeader from "../SectionHeader"
import PhotoCarousel from "../PhotoCarousel"

const ProjectBox = () => {
	const projectList = projectData.projects
    const logoList = projectList.map(p => p.companyLogo)
    
	return (
		<>
      <SectionHeader title="Project" logoList={logoList}/>
			{projectList.map((project, index) => {
				const {
					companyName,
					duration,
					imgUrls,
					description,
					companyLogo,
          title
				} = project

				return (
					<section className="projectSection" key={index}>
            <div className="dashedLine"></div>
            <div className="projectContainer">
              <div className="projectHead">
                <div className="leftContent">
                  <img
                    className="projectCompanyLogo"
                    src={companyLogo}
                    alt="company logo"
                  />
                  <p className="text4">{companyName} - {title}</p>
                </div>
                <div className="rightContent">
                  <p>{duration}</p>
                </div>
              </div>
              
              <div className="flex max-w-[1200px] w-full">
                <div className="flex max-w-[600px] w-full">
                  {!!imgUrls && !!imgUrls.length && <PhotoCarousel imgUrls={imgUrls} />}
                </div>
                <div className="flex-1">
                  <ul className="list-disc pl-6">
                    {description.map((text, index) => (
                      <li key={index}>{text}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
				)
			})}
		</>
	)
}

export default ProjectBox