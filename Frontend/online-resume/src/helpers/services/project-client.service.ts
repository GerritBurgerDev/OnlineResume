import {BaseClient} from "@/helpers/services/base-client";
import {ApiConfig, IClientMessageResponse, IProjectClient} from "@/interfaces/client.interface";
import {IProject, IRecommendation} from "@/interfaces/project-interfaces";
import {IProfile} from "@/interfaces/global-interfaces";
import {AxiosError} from "axios";

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

    addRecommendation = async (data: IRecommendation): Promise<IClientMessageResponse | undefined> => {
        return await this.post<IRecommendation | null, IClientMessageResponse>('/recommendations', data);
    }
}