import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import Home from './home';
import {ALL_SKILLS, SELECTED_SKILL_ALL, SKILL_PHP} from '@/constants/global-constants';
import {getElementById} from "@/helpers/testing-helpers";

describe('Home Page Tests', () => {
    let component: ShallowWrapper | null = null;

    beforeEach(() => {
        component = shallow(<Home />);
    });

    it('should render component', () => {
        expect(component).toBeTruthy();
    });

    describe('When the user selects the PhP tech skill', () => {
        it('should have the default selected before the selection',  () => {
            expect(getElementById(component, 'selected-skill')?.text()).toBe(`( ${SELECTED_SKILL_ALL.name} )`);
        });

        it('should set the selectedSkill correctly',  () => {
            getElementById(component, 'tech-skill')?.at(1).simulate('click');

            expect(getElementById(component, 'selected-skill')?.text()).toBe(`( ${ALL_SKILLS[SKILL_PHP].name} )`);
        });
    });
});