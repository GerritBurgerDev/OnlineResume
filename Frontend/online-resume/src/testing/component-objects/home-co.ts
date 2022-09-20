import {ShallowWrapper} from "enzyme";
import {BaseCo} from "@/testing/component-objects/base-co";

export class HomeCo extends BaseCo {
    constructor(component: ShallowWrapper | null) {
        super(component);
    }
}