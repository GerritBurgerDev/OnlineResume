import create from "zustand";
import {IProject} from "@/interfaces/project-interfaces";
import {projectClientService} from "@/helpers/services/services";

interface IProjectStore {
    // Data
    projects: IProject[],
    projectsForSkill: IProject[],

    // Loading States
    loadingAllProjects: boolean,
    loadingProjectForSkill: boolean,

    // Actions
    getAllProjects: () => Promise<void>,
    getProjectsForSkill: (skillName: string) => Promise<void>,
}

export const useProjectsStore = create<IProjectStore>((set) => ({
    projects: [],
    loadingAllProjects: false,
    projectsForSkill: [],
    loadingProjectForSkill: false,
    getAllProjects: async () => {
        set(() => ({
            loadingAllProjects: true
        }));

        const data = await projectClientService.getAllProjects();

        set(() => ({
            loadingAllProjects: false,
            projects: data
        }));
    },
    getProjectsForSkill: async (skillName: string) => {
        set(() => ({
            loadingProjectForSkill: true
        }));

        const data = await projectClientService.getProjectsForSkill(skillName)  || [];

        set(() => ({
            loadingProjectForSkill: false,
            projectsForSkill: data,
        }));
    }
}))