import React from "react";
import "./experience.scss";
import Project from "@/components/experience/project/project";

const Experience = () => {
    const projects = [1, 2, 3,4 ,5 ]

    return (
        <div className="experience-page">
            <h1>Projects</h1>

            <div className="projects-container">
                {
                    projects.map(i => {
                        return (
                            <Project key={i} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Experience;