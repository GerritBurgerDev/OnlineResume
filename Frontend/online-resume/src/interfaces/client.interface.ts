import {ICommonData} from "@/interfaces/global-interfaces";
import {IProject} from "@/interfaces/project-interfaces";

export interface ApiConfig {
    accessToken?: string
}

export interface IGlobalClient {
    getCommonData(): Promise<ICommonData | undefined>
}

export interface IProjectClient {
    getAllProjects(): Promise<IProject[] | undefined>
    getProjectsForSkill(skillName: string): Promise<IProject[] | undefined>
}