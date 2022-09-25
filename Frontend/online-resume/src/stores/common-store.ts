import create from "zustand";
import {ICurrentEmployment, TechSkill} from "@/interfaces/global-interfaces";
import {globalServiceClient} from "@/helpers/services/services";

interface ICommonStore {
    // Data
    techSkills: TechSkill[],
    currentEmployment: ICurrentEmployment,

    // Loading States
    commonDataLoading: boolean,

    // Actions
    getCommonData: () => Promise<void>,
}

export const useCommonStore = create<ICommonStore>((set) => ({
    commonDataLoading: false,
    techSkills: [],
    currentEmployment: {} as ICurrentEmployment,
    getCommonData: async () => {
        set(() => ({
            commonDataLoading: true
        }));

        const data = await globalServiceClient.getCommonData();

        set(() => ({
            commonDataLoading: false,
            techSkills: Object.values(data?.techSkills as { [key: string]: TechSkill }),
            currentEmployment: data?.currentEmployment,
        }));
    },
}))