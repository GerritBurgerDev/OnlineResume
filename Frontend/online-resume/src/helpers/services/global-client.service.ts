import {BaseClient} from "@/helpers/services/base-client";
import {ApiConfig, IClientMessageResponse, IGlobalClient} from "@/interfaces/client.interface";
import {ICommonData, IProfile} from "@/interfaces/global-interfaces";

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

    login = async (data: IProfile | null): Promise<IClientMessageResponse | undefined> => {
        try {
            return await this.post<IProfile | null, IClientMessageResponse>('/signin', data);
        } catch (error) {
            // TODO: Error Handling
            console.error(error);
        }
    }
}