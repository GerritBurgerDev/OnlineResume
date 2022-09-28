import React, {useEffect} from "react";
import "./experience.scss";
import Project from "@/components/experience/project/project";
import {useProjectsStore} from "@/stores/project-store";
import {IProject} from "@/interfaces/project-interfaces";

const Experience = () => {
    const { projects, getAllProjects } = useProjectsStore((state) => state);

    useEffect(() => {
        const fetchAllProjects = async () => {
            await getAllProjects();
        }

        fetchAllProjects().catch(() => { /* DONE */ });
    }, [getAllProjects]);

    return (
        <div className="experience-page">
            <h1>Projects</h1>

            <div className="projects-container">
                {
                    projects.map((project: IProject) => {
                        return (
                            <Project key={project.id}  {...project} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Experience;