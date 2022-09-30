import create, {StateCreator} from "zustand";
import {IProject} from "@/interfaces/project-interfaces";
import {projectClientService} from "@/helpers/services/services";
import {persist, PersistOptions} from "zustand/middleware";

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

type MyPersist = (
    config: StateCreator<IProjectStore>,
    options: PersistOptions<IProjectStore>
) => StateCreator<IProjectStore>

export const useProjectsStore = create<IProjectStore>(
    (persist as unknown as MyPersist)(
        (set) => ({
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
        }),
        { name: 'profile-store' }
    )
);