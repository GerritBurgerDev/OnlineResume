import {BaseClient} from "@/helpers/services/base-client";
import {ApiConfig, IGlobalClient} from "@/interfaces/client.interface";
import {ICommonData} from "@/interfaces/global-interfaces";

export class GlobalClientService implements IGlobalClient {
    private apiConfig: ApiConfig | undefined;
    private client: BaseClient;

    constructor(apiConfig: ApiConfig | undefined = undefined) {
        this.apiConfig = apiConfig;
        this.client = new BaseClient(apiConfig);
    }

    updateAuthToken = (token: string) => {
        this.client.updateAuthToken(token);
    }

    getCommonData = async (): Promise<ICommonData | undefined> => {
        try {
            return await this.client.get<ICommonData>('/common-data');
        } catch (error) {
            // TODO: Error Handling
            console.error(error);
        }
    }
}