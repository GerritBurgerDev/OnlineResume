import React, {useEffect} from "react";
import "./experience.scss";
import Project from "@/components/experience/project/project";
import {useProjectsStore} from "@/stores/project-store";
import {IProject} from "@/interfaces/project-interfaces";

const Experience = () => {
    const { projects, getAllProjects } = useProjectsStore();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    // entry.target.classList.remove('show');
                }
            })
        });

        const projectElements = document.querySelectorAll('.hidden');
        projectElements.forEach((el: Element) => observer.observe(el));

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
                            <div key={project.id} className="hidden">
                                <Project {...project} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Experience;