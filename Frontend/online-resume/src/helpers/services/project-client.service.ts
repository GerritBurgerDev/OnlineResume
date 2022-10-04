import {BaseClient} from "@/helpers/services/base-client";
import {ApiConfig, IClientMessageResponse, IProjectClient} from "@/interfaces/client.interface";
import {IProject, IRecommendation} from "@/interfaces/project-interfaces";

export class ProjectClientService extends BaseClient implements IProjectClient {
    constructor(apiConfig: ApiConfig | undefined = undefined) {
        super(apiConfig);
    }

    getAllProjects = async (): Promise<IProject[] | undefined> => {
        try {
            return await this.get<IProject[]>('/projects');
        } catch (error) {
            // TODO: Error Handling
            console.error(error);
        }
    }

    getProjectsForSkill = async (skillName: string): Promise<IProject[] | undefined> => {
        try {
            return await this.get<IProject[]>(`/projects/${skillName}`);
        } catch (error) {
            // TODO: Error Handling
            console.error(error);
        }
    }

    getAllRecommendations = async (): Promise<IRecommendation[] | undefined> => {
        try {
            return await this.get<IRecommendation[]>(`/recommendations`);
        } catch (error) {
            // TODO: Error Handling
            console.error(error);
        }
    }

    getRecommendationsForProject = async (projectId: number): Promise<IRecommendation[] | undefined> => {
        return await this.get<IRecommendation[]>(`/project/${projectId}/recommendations`);
    }

    addRecommendation = async (data: IRecommendation): Promise<IClientMessageResponse | undefined> => {
        return await this.post<IRecommendation | null, IClientMessageResponse>('/recommendations', data);
    }

    updateRecommendationState = async (data: IRecommendation): Promise<IClientMessageResponse | undefined> => {
        return await this.put<IRecommendation | null, IClientMessageResponse>('/recommendations', data);
    }

    removeRecommendation = async (id: number): Promise<IClientMessageResponse | undefined> => {
        return await this.delete<IClientMessageResponse>(`/recommendation/${id}`);
    }
}