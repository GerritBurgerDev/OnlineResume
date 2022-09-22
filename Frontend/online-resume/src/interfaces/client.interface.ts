import {ICommonData} from "@/interfaces/global-interfaces";

export interface ApiConfig {
    accessToken?: string
}

export interface IGlobalClient {
    updateAuthToken(token: string): void;
    getCommonData(): Promise<ICommonData | undefined>
}