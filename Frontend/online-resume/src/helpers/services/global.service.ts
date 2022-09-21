import axios, {AxiosInstance} from "axios";
import {TechSkill} from "@/interfaces/global-interfaces";
import {setupInterceptorsTo} from "@/helpers/axios-interceptor";

export interface IGlobalClient {
    getCommonData(): Promise<ICommonData>
}

export interface ICommonData {
    techSkills: TechSkill[]
}

export class GlobalClient implements IGlobalClient{
    BASE_URL = 'http://localhost:8081';
    TIMEOUT = 10000; // 10 seconds
    instance: AxiosInstance;

    constructor() {
        this.instance = setupInterceptorsTo(axios.create({
            baseURL: this.BASE_URL,
            timeout: this.TIMEOUT,
        }));
    }

    getCommonData = async (): Promise<ICommonData> => {
        return this.instance.get<ICommonData>('/common-data').then(response => response.data);
    }
}