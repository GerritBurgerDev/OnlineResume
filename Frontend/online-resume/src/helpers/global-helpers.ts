import {SELECTED_SKILL_ALL, SKILL_GO} from "@/constants/global-constants";
import {TechSkill} from "@/interfaces/global-interfaces";

export const getSelectedSkill = (name: string): TechSkill => {
    switch (name) {
        case SKILL_GO:
            return {
                icon: SKILL_GO,
                name: "Go",
                type: "Backend",
                projects: ['OnlineResume', 'Andile Project'],
                experienceDuration: '1 Month'
            };
        default:
            return SELECTED_SKILL_ALL;
    }
}