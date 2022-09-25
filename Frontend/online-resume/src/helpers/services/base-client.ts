import axios, {AxiosInstance} from "axios";
import {setupInterceptorsTo} from "@/helpers/axios-interceptor";
import {ApiConfig} from "@/interfaces/client.interface";

interface IBaseClient {
    updateAuthToken(token: string): void;
    post<TRequest, TResponse>(url: string, payload: TRequest): Promise<TResponse>;
    put<TRequest, TResponse>(url: string, payload: TRequest): Promise<TResponse>;
    delete<TResponse>(url: string): Promise<TResponse>;
    get<TResponse>(url: string): Promise<TResponse>;
}

export class BaseClient implements IBaseClient {
    private readonly BASE_URL;
    private TIMEOUT = 10000; // 10 seconds
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
        // TODO: I need to make this better.
        if (!window.location.href.includes('localhost')) {
            this.BASE_URL = 'http://ec2-18-169-241-12.eu-west-2.compute.amazonaws.com:8081';
        } else {
            console.log(window.location.href);
            this.BASE_URL = 'http://localhost:8081/';
        }

        this.apiConfig = apiConfig;
        this.client = this.createClient();
    }

    updateAuthToken = (token: string) => {
        this.apiConfig = {
            ...this.apiConfig,
            accessToken: token
        };
    }

    private getRequestConfig = () => {
        return {
            headers: {
                ...(this.apiConfig?.accessToken && {
                    Authorization: `Bearer ${this.apiConfig.accessToken}`,
                })
            },
            ...(this.apiConfig?.accessToken && { withCredentials: true })
        }
    }

    async post<TRequest, TResponse>(url: string, payload: TRequest): Promise<TResponse> {
        try {
            const response = await this.client.post<TResponse>(url, payload, this.getRequestConfig());
            return response.data;
        } catch (error) {
            // TODO: Add Error Handling
        }

        return {} as TResponse;
    }

    async put<TRequest, TResponse>(url: string, payload: TRequest): Promise<TResponse> {
        try {
            const response = await this.client.put<TResponse>(url, payload, this.getRequestConfig());
            return response.data;
        } catch (error) {
            // TODO: Add Error Handling
        }

        return {} as TResponse;
    }

    async delete<TResponse>(url: string): Promise<TResponse> {
        try {
            const response = await this.client.delete<TResponse>(url, this.getRequestConfig());
            return response.data;
        } catch (error) {
            // TODO: Add Error Handling
        }

        return {} as TResponse;
    }

    async get<TResponse>(url: string): Promise<TResponse> {
        try {
            const response = await this.client.get<TResponse>(url, this.getRequestConfig());
            return response.data;
        } catch (error) {
            // TODO: Add Error Handling
        }

        return {} as TResponse;
    }
}