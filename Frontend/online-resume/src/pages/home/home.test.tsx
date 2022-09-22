import React from 'react';
import {shallow} from 'enzyme';
import Home from './home';
import {ALL_SKILLS, SELECTED_SKILL_ALL, SKILL_PHP} from '@/constants/global-constants';
import {HomeCo} from "@/helpers/component-objects/home-co";
// import {GlobalClient} from "../../helpers/services/base-client";

describe('Home Page Tests', () => {
    let HomeComponent: HomeCo;
    let service;

    beforeAll(() => {
        // service = new GlobalClient();

        // jest.spyOn(service, 'getCommonData').mockReturnValue(new Promise(function (resolve) {
        //     resolve({
        //         techSkills: [
        //             {
        //                 "icon": "go",
        //                 "name": "Go",
        //                 "type": "Backend",
        //                 "projects": ["OnlineResume", "Andile Project"],
        //                 "experienceDuration": "1 Month",
        //                 "confidence": 0
        //             },
        //             {
        //                 "icon": "php",
        //                 "name": "PhP",
        //                 "type": "Backend",
        //                 "projects": ["Activate", "Walmart Creator Portal"],
        //                 "experienceDuration": "8 Months",
        //                 "confidence": 0
        //             }
        //         ]
        //     })
        // }));

        const component = shallow(<Home />);
        HomeComponent = new HomeCo(component);
    });

    it('should render component', () => {
        expect(HomeComponent.component).toBeTruthy();
    });

    describe('When the user selects the PhP tech skill', () => {
        it('should have the default selected before the selection',  () => {
            expect(HomeComponent.getSelectedSkillText()).toBe(`( ${SELECTED_SKILL_ALL.name} )`);
        });

        it('should set the selectedSkill correctly',  () => {
            HomeComponent.getElementAt('tech-skill', 1)?.simulate('click');

            expect(HomeComponent.getSelectedSkillText()).toBe(`( ${ALL_SKILLS[SKILL_PHP].name} )`);
        });

        it('should show the "Show all skills" text',  () => {
            expect(HomeComponent.getElementByClassName('show-all-skills')).toBeTruthy();
        });

        describe('and the "show all skills" text is clicked', () => {
            beforeAll(() => {
                HomeComponent.clickElement('show-all-skills', null, true);
            });

            it('should show all the tech skills again', function () {
                expect(HomeComponent.getSelectedSkillText()).toBe(`( ${SELECTED_SKILL_ALL.name} )`);
            });
        })
    });
});