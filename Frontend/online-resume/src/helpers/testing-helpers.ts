import {ShallowWrapper} from "enzyme";

// eslint-disable-next-line
export const getElementById = (component: ShallowWrapper | null, id: string): ShallowWrapper<any> | null => {
    return component ? component?.find(`[data-test="${id}"]`) : null;
}