import axios, {AxiosInstance} from "axios";
import {setupInterceptorsTo} from "@/helpers/axios-interceptor";
import {ApiConfig} from "@/interfaces/client.interface";

interface IBaseClient {
    updateAuthToken(token: string): void;
    get<TResponse>(url: string): Promise<TResponse>;
}

export class BaseClient implements IBaseClient{
    BASE_URL = 'http://localhost:8081';
    TIMEOUT = 10000; // 10 seconds
    private apiConfig: ApiConfig | undefined;
    private client: AxiosInstance;

    protected createClient = (): AxiosInstance => {
        return setupInterceptorsTo(axios.create({
            baseURL: this.BASE_URL,
            timeout: this.TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            }
        }));
    }

    constructor(apiConfig: ApiConfig | undefined) {
        this.apiConfig = apiConfig;
        this.client = this.createClient();
    }

    updateAuthToken = (token: string) => {
        this.apiConfig = {
            ...this.apiConfig,
            accessToken: token
        };
    }

    protected getRequestConfig = () => {
        return {
            headers: {
                ...(this.apiConfig?.accessToken && {
                    Authorization: `Bearer ${this.apiConfig.accessToken}`,
                })
            },
            ...(this.apiConfig?.accessToken && { withCredentials: true })
        }
    }

    async get<TResponse>(url: string): Promise<TResponse> {
        try {
            const response = await this.client.get<TResponse>(url, this.getRequestConfig());
            return response.data;
        } catch (error) {
            // TODO: Add Error Handling
            // handleServiceError(error);
        }

        return {} as TResponse;
    }
}