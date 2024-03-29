import create, {StateCreator} from "zustand";
import {IProject, IRecommendation} from "@/interfaces/project-interfaces";
import {projectClientService, updateAuthToken} from "@/helpers/services/services";
import {persist, PersistOptions} from "zustand/middleware";
import {RECOMMENDATION_STATE_POSTED} from "@/constants/project-constants";
import {IClientMessageResponse} from "@/interfaces/client.interface";
import {useProfileStore} from "@/stores/profile-store";

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
    getRecommendationsForProject: (projectId: number) => Promise<IRecommendation[] | undefined>,
    addRecommendation: (data: IRecommendation) => Promise<IClientMessageResponse | undefined>,
    updateRecommendationState: (data: IRecommendation) => Promise<IClientMessageResponse | undefined>,
    removeRecommendation: (id: number) => Promise<IClientMessageResponse | undefined>,

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
            // Data
            projects: [],
            loadingAllProjects: false,
            projectsForSkill: [],
            loadingProjectForSkill: false,
            recommendations: [],
            loadingAllRecommendations: false,
            // Actions
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

                const data = await projectClientService.getAllRecommendations();

                set(() => ({
                    loadingAllRecommendations: false,
                    recommendations: data || []
                }));
            },
            getRecommendationsForProject: async (projectId: number) => {
              return await projectClientService.getRecommendationsForProject(projectId);
            },
            addRecommendation: async (data: IRecommendation) => {
                const profileData = useProfileStore.getState().profileData;
                updateAuthToken(profileData?.accessToken || '');

                if (Array.isArray(data.projectId)) {
                    let response;
                    for (let i = 0; i < data.projectId.length; i++) {
                        // eslint-disable-next-line no-useless-catch
                        try {
                            response = await projectClientService.addRecommendation({
                                ...data,
                                projectId: data.projectId[i]
                            });
                        } catch (err) {
                            throw err;
                        }
                    }

                    return response;
                }

                const result = await projectClientService.addRecommendation(data);

                updateAuthToken('');

                return result;
            },
            updateRecommendationState: async (data: IRecommendation) => {
                const profileData = useProfileStore.getState().profileData;
                updateAuthToken(profileData?.accessToken || '');

                const result = await projectClientService.updateRecommendationState(data);

                updateAuthToken('');

                return result;
            },
            removeRecommendation: async (id: number) => {
                const profileData = useProfileStore.getState().profileData;
                updateAuthToken(profileData?.accessToken || '');

                const result = await projectClientService.removeRecommendation(id);

                updateAuthToken('');

                return result
            },

            // Getters
            getPostedRecommendations: () => {
                const data = get().recommendations;

                if (!data || Object.keys(data).length === 0) {
                    return [];
                }

                return data.filter(recommendation => recommendation.state === RECOMMENDATION_STATE_POSTED);
            },
        }),
        {
            name: 'project-store',
            getStorage: () => sessionStorage
        }
    )
);