import {ShallowWrapper} from "enzyme";
import {BaseCo} from "./base-co";

export class HomeCo extends BaseCo {
    constructor(component: ShallowWrapper | null) {
        super(component);
    }

    getSelectedSkillText = (): string | undefined => {
        return this.getElementText('selected-skill');
    }
}