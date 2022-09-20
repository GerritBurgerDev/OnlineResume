import {ShallowWrapper} from "enzyme";

export class BaseCo {
    component: ShallowWrapper | null;

    constructor(component: ShallowWrapper | null) {
        this.component = component;
    }

    getElement = (id: string): ShallowWrapper<any> | undefined => {
        return this.component?.find(`[data-test="${id}"]`);
    }

    getElementAt = (id: string, index: number): ShallowWrapper<any> | undefined => {
        return this.getElement(id)?.at(index);
    }

    getElementText = (id: string): string | undefined => {
        return this.getElement(id)?.text();
    }
}