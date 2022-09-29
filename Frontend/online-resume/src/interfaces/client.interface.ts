import {ICommonData, IProfile} from "@/interfaces/global-interfaces";
import {IProject} from "@/interfaces/project-interfaces";

export interface ApiConfig {
    accessToken?: string
}

export interface IClientMessageResponse {
    message: string,
    statusCode: number
}

export interface IGlobalClient {
    getCommonData(): Promise<ICommonData | undefined>
    login(data: IProfile): Promise<IClientMessageResponse | undefined>
}

export interface IProjectClient {
    getAllProjects(): Promise<IProject[] | undefined>
    getProjectsForSkill(skillName: string): Promise<IProject[] | undefined>
}