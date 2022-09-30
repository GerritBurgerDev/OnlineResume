import create, {StateCreator} from "zustand";
import {IProfile} from "@/interfaces/global-interfaces";
import {globalServiceClient, updateAuthToken} from "@/helpers/services/services";
import {persist, PersistOptions} from "zustand/middleware";

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

export const useProfileStore = create<IProfileStore>(
    (persist as unknown as MyPersist)(
        (set) => ({
            profileData: null,
            setProfileData: async (data: IProfile | null) => {
                updateAuthToken(data?.accessToken || '');

                if (data) {
                    try {
                        await globalServiceClient.login(data);
                    } catch (exception) {
                        console.log(exception)
                    }
                }

                set(() => ({
                    profileData: data
                }));
            }
        }),
        { name: 'profile-store' }
    )
)