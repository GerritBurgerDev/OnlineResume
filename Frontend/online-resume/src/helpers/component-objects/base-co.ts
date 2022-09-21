import {ShallowWrapper} from "enzyme";

export class BaseCo {
    component: ShallowWrapper | null;

    constructor(component: ShallowWrapper | null) {
        this.component = component;
    }

    getElement = (id: string): ShallowWrapper<any> | undefined => {
        return this.component?.find(`[data-test="${id}"]`);
    }

    getElementByClassName = (id: string): ShallowWrapper<any> | undefined => {
        return this.component?.find(`.${id}`);
    }

    getElementAt = (id: string, index: number): ShallowWrapper<any> | undefined => {
        return this.getElement(id)?.at(index);
    }

    getElementText = (id: string): string | undefined => {
        return this.getElement(id)?.text();
    }

    clickElement = (id: string, index: null | number = null, getByClassName = false) => {
        const element = getByClassName ? this.getElementByClassName(id) : this.getElement(id);

        if (index) {
            element?.at(index).simulate('click');
            return;
        }

        element?.simulate('click');
    }
}