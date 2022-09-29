import {GlobalClientService} from "@/helpers/services/global-client.service";
import {ProjectClientService} from "@/helpers/services/project-client.service";

export const globalServiceClient = new GlobalClientService();
export const projectClientService = new ProjectClientService();

export const updateAuthToken = (token: string) => {
    globalServiceClient.updateAuthToken(token);
    projectClientService.updateAuthToken(token);
}