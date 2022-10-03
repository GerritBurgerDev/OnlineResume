import React, {useEffect} from "react";
import "./experience.scss";
import Project from "@/components/experience/project/project";
import {useProjectsStore} from "@/stores/project-store";
import {IProject} from "@/interfaces/project-interfaces";

const Experience = () => {
    const { projects, getAllProjects } = useProjectsStore();

    useEffect(() => {
        const fetchAllProjects = async () => {
            await getAllProjects();
        }

        fetchAllProjects().catch(() => { /* DONE */ });
    }, []);

    return (
        <div className="experience-page fade-in--1s">
            <div className="projects-container">
                {
                    Array.isArray(projects) && projects.map((project: IProject) => {
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