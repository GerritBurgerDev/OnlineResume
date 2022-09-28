import {BaseClient} from "@/helpers/services/base-client";
import {ApiConfig, IGlobalClient} from "@/interfaces/client.interface";
import {ICommonData} from "@/interfaces/global-interfaces";
import {IProject} from "@/interfaces/project-interfaces";

export class GlobalClientService extends BaseClient implements IGlobalClient {
    constructor(apiConfig: ApiConfig | undefined = undefined) {
        super(apiConfig);
    }

    getCommonData = async (): Promise<ICommonData | undefined> => {
        try {
            return await this.get<ICommonData>('/common-data');
        } catch (error) {
            // TODO: Error Handling
            console.error(error);
        }
    }
}