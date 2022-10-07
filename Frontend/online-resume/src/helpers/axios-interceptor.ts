/* eslint-disable */
import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {useProfileStore} from "@/stores/profile-store";
import {updateAuthToken} from "@/helpers/services/services";

const sanitizeResponse = (object: any, key: string) => {
    if (!object || (typeof object !== 'object' || Array.isArray(object))) {
        return object;
    }

    object = Object.assign({}, object);

    if (object[key]) {
        delete object[key];
    }

    Object.keys(object).forEach(k => {
        object[k] = sanitizeResponse(object[k], key);
    })

    return object;
}

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    // TODO: Do this when we have authing
    return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    // Removes the `_id` that comes with mongo responses.
    response = sanitizeResponse(response, '_id');

    return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}

export const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance  => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);

    return axiosInstance;
}