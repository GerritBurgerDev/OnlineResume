import {BaseClient} from "@/helpers/services/base-client";
import {ApiConfig, IProjectClient} from "@/interfaces/client.interface";
import {IProject} from "@/interfaces/project-interfaces";

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
}