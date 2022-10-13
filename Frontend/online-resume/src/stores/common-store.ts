import create from "zustand";
import {ICurrentEmployment, TechSkill} from "@/interfaces/global-interfaces";
import {globalServiceClient} from "@/helpers/services/services";
import _ from "lodash";

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

        console.log(data);

        if (data?.techSkills) {
            Object.entries(data.techSkills).map(entry => {
                data.techSkills[entry[0]] = _.mapKeys(entry[1], (v, k) => _.camelCase(k))
            })
        }

        set(() => ({
            commonDataLoading: false,
            techSkills: Object.values(data?.techSkills as { [key: string]: TechSkill }),
            currentEmployment: data?.currentEmployment,
        }));
    }
}))