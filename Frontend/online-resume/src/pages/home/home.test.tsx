import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import Home from './home';
import {ALL_SKILLS, SELECTED_SKILL_ALL, SKILL_PHP} from '@/constants/global-constants';
import {HomeCo} from "@/testing/component-objects/home-co";

describe('Home Page Tests', () => {
    let HomeComponent: HomeCo;

    beforeEach(() => {
        const component = shallow(<Home />);
        HomeComponent = new HomeCo(component);
    });

    it('should render component', () => {
        expect(HomeComponent.component).toBeTruthy();
    });

    describe('When the user selects the PhP tech skill', () => {
        it('should have the default selected before the selection',  () => {
            expect(HomeComponent.getElementText('selected-skill')).toBe(`( ${SELECTED_SKILL_ALL.name} )`);
        });

        it('should set the selectedSkill correctly',  () => {
            HomeComponent.getElementAt('tech-skill', 1)?.simulate('click');

            expect(HomeComponent.getElementText('selected-skill')).toBe(`( ${ALL_SKILLS[SKILL_PHP].name} )`);
        });
    });
});