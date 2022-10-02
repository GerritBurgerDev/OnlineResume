import create, {StateCreator} from "zustand";
import {IProject, IRecommendation} from "@/interfaces/project-interfaces";
import {projectClientService} from "@/helpers/services/services";
import {persist, PersistOptions} from "zustand/middleware";
import {RECOMMENDATION_STATE_POSTED, TEMP_RECOMMENDATIONS} from "@/constants/project-constants";

interface IProjectStore {
    // Data
    projects: IProject[],
    projectsForSkill: IProject[],
    recommendations: IRecommendation[],

    // Loading States
    loadingAllProjects: boolean,
    loadingProjectForSkill: boolean,
    loadingAllRecommendations: boolean,

    // Actions
    getAllProjects: () => Promise<void>,
    getProjectsForSkill: (skillName: string) => Promise<void>,
    getAllRecommendations: () => Promise<void>,

    // Getters
    getPostedRecommendations: () => IRecommendation[],
}

type MyPersist = (
    config: StateCreator<IProjectStore>,
    options: PersistOptions<IProjectStore>
) => StateCreator<IProjectStore>

export const useProjectsStore = create<IProjectStore>(
    (persist as unknown as MyPersist)(
        (set, get) => ({
            projects: [],
            loadingAllProjects: false,
            projectsForSkill: [],
            loadingProjectForSkill: false,
            recommendations: TEMP_RECOMMENDATIONS,
            loadingAllRecommendations: false,
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
            },
            getAllRecommendations: async () => {
                set(() => ({
                    loadingAllRecommendations: true
                }));

                const data = TEMP_RECOMMENDATIONS;
                // const data = await projectClientService.getAllRecommendations();

                set(() => ({
                    loadingAllRecommendations: false,
                    recommendations: data
                }));
            },
            getPostedRecommendations: () => {
                return get().recommendations.filter(recommendation => recommendation.state === RECOMMENDATION_STATE_POSTED)
            },
        }),
        {
            name: 'project-store',
            getStorage: () => sessionStorage
        }
    )
);