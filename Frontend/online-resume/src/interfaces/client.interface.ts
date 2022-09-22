import {ICommonData} from "@/interfaces/global-interfaces";

export interface ApiConfig {
    accessToken?: string
}

export interface IGlobalClient {
    getCommonData(): Promise<ICommonData | undefined>
}