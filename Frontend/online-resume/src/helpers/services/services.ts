import {GlobalClientService} from "@/helpers/services/global-client.service";

export const globalServiceClient = new GlobalClientService();

export const updateAuthToken = (token: string) => {
    globalServiceClient.updateAuthToken(token);
}