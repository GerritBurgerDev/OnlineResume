import create from "zustand";
import {IProject} from "@/interfaces/project-interfaces";
import {globalServiceClient, projectClientService} from "@/helpers/services/services";

interface IProjectStore {
    // Data
    projects: IProject[],

    // Loading States
    loadingAllProjects: boolean,

    // Actions
    getAllProjects: () => Promise<void>,
}

export const useProjectsStore = create<IProjectStore>((set) => ({
    projects: [],
    loadingAllProjects: false,
    getAllProjects: async () => {
        set(() => ({
            loadingAllProjects: true
        }));

        const data = await projectClientService.getAllProjects();

        set(() => ({
            loadingAllProjects: false,
            projects: data
        }));
    }
}))