import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import Home from './home';
import {ALL_SKILLS, SELECTED_SKILL_ALL, SKILL_PHP} from '@/constants/global-constants';

describe('Home Page Tests', () => {
    let component: ShallowWrapper<any> | null = null;

    beforeEach(() => {
        component = shallow(<Home />);
    });

    it('should render component', () => {
        expect(component).toBeTruthy();
    });

    describe('When the user selects the PhP tech skill', () => {
        it('should have the default selected before the selection',  () => {
            expect(component?.find('[data-test="selected-skill"]').text()).toBe(`( ${SELECTED_SKILL_ALL.name} )`);
        });

        it('should set the selectedSkill correctly',  () => {
            component?.find('[data-test="tech-skill"]').at(1).simulate('click');

            expect(component?.find('[data-test="selected-skill"]').text()).toBe(`( ${ALL_SKILLS[SKILL_PHP].name} )`);
        });
    });
});