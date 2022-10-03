import create, {StateCreator} from "zustand";
import {IProfile} from "@/interfaces/global-interfaces";
import {globalServiceClient, updateAuthToken} from "@/helpers/services/services";
import {persist, PersistOptions} from "zustand/middleware";
import {IClientMessageResponse} from "@/interfaces/client.interface";

interface IProfileStore {
    // Data
    profileData: IProfile | null,

    // Loading States

    // Actions
    setProfileData: (data: IProfile | null) => Promise<void>
}

type MyPersist = (
    config: StateCreator<IProfileStore>,
    options: PersistOptions<IProfileStore>
) => StateCreator<IProfileStore>

interface IProfileResponse extends IClientMessageResponse {
    isAdmin?: boolean
}

export const useProfileStore = create<IProfileStore>(
    (persist as unknown as MyPersist)(
        (set) => ({
            profileData: null,
            setProfileData: async (data: IProfile | null) => {
                updateAuthToken(data?.accessToken || '');

                let result: IProfileResponse | undefined;
                if (data) {
                    try {
                        result = await globalServiceClient.login(data);
                    } catch (exception) {
                        console.log(exception)
                    }
                }

                if (data) {
                    data.isAdmin = result?.isAdmin;
                }

                set(() => ({
                    profileData: data
                }));
            }
        }),
        {
            name: 'profile-store',
            getStorage: () => sessionStorage
        }
    )
)