import create from "zustand";
import {IProfile} from "@/interfaces/global-interfaces";
import {globalServiceClient, updateAuthToken} from "@/helpers/services/services";

interface IProfileStore {
    // Data
    profileData: IProfile | null,

    // Loading States

    // Actions
    setProfileData: (data: IProfile | null) => Promise<void>
}

export const useProfileStore = create<IProfileStore>((set) => ({
    profileData: null,
    setProfileData: async (data: IProfile | null) => {
        updateAuthToken(data?.accessToken || '');

        if (data) {
            await globalServiceClient.login(data);
        }

        set(() => ({
            profileData: data
        }));
    }
}))