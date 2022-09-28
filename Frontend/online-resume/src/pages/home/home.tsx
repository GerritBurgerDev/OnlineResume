import React, {useEffect, useState} from 'react';
import "./home.scss";
import IconCard from "@/components/util/icon-card/icon-card";
import {Tooltip, Icon, Rating} from "@mui/material";
import {orange} from "@mui/material/colors";
import {TechSkill} from "@/interfaces/global-interfaces";
import {SELECTED_SKILL_ALL} from "@/constants/global-constants";
import {useCommonStore} from "@/stores/common-store";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;
import _ from "lodash";
import MyBio from "@/components/home/header/my-bio";
import CurrentEmployment from "@/components/home/header/current-employment";
import {useProjectsStore} from "@/stores/project-store";
import SpecificSkill from "@/components/home/specific-skill";

const Home = () => {
    const { commonDataLoading, techSkills, getCommonData } = useCommonStore((state) => state);
    const { loadingProjectForSkill, projectsForSkill, getProjectsForSkill } = useProjectsStore((state) => state);

    const [selectedSkill, setSelectedSkill] = useState<TechSkill>(SELECTED_SKILL_ALL);
    const [switchSkill, setSwitchSkill] = useState<string>('');

    const selectSkill = (name: string) => {
        if (!switchSkill && _.toLower(selectedSkill.name) !== _.toLower(name)) {
            setSwitchSkill(name);
        }
    };

    useEffect(() => {
        if (switchSkill) {
            setTimeout(() => {
                const skill = techSkills.find((skill: TechSkill) => _.toLower(skill.name) === _.toLower(switchSkill));
                setSelectedSkill(skill || SELECTED_SKILL_ALL);
                setSwitchSkill('');
            }, selectedSkill.name === SELECTED_SKILL_ALL.name ? 0 : 200);
        }
    }, [selectedSkill.name, switchSkill, techSkills]);

    // TODO: Move to store and use once I have admin working
    // const updateSkill = (name: string, key: string, value: string | number | null ) => {
        // TODO: Call api to about skill details
    // };

    useEffect(() => {
        const fetchCommonData = async () => {
            await getCommonData();
        }

        fetchCommonData().catch(() => { /* DONE */ });
    }, [getCommonData]);

    useEffect(() => {
        const fetchProjectsForSkill = async () => {
            await getProjectsForSkill(selectedSkill.name);
        }

        fetchProjectsForSkill().catch(() => { /* DONE */ });
    }, [selectedSkill]);

    const renderSpecificSkill = (): JSX.Element => {
        return (
            <SpecificSkill
                loadingProjectForSkill={loadingProjectForSkill}
                projectsForSkill={projectsForSkill}
                selectedSkill={selectedSkill}
                switchSkill={switchSkill}
            />
        );
    }

    const renderTechSkills = (): JSX.Element[] | JSX.Element => {
        return (
            !commonDataLoading ? techSkills.map((skill: TechSkill) => {
                return (
                    <tr key={skill.name}>
                        <td className="tech-skill" data-test="tech-skill" onClick={ () => selectSkill(skill.name) }>
                            <IconCard icon={skill.icon} isCustom size={32}/>
                            <span>{skill.name}</span>
                        </td>
                        <td>{skill.type}</td>
                        <td>
                            {
                                skill.projects.map((project: string, index: number) => {
                                    return (
                                        <span key={project}>
                                                                {project}
                                            {index !== skill.projects.length - 1 && ', '}
                                                            </span>
                                    )
                                })
                            }
                        </td>
                        <td>{skill.experienceDuration}</td>
                        <td>
                            <Rating
                                name="simple-controlled"
                                value={skill.confidence}
                                // onChange={(event: SyntheticEvent, newValue: number | null) => {
                                //     // updateSkill(skill.name, 'confidence', newValue)
                                // }}
                                precision={0.5}
                                readOnly
                            />
                        </td>
                    </tr>
                )
            }) : (
                <tr className="loading-row">
                    <td colSpan={5}>
                        <div className="loading-container">
                            Loading...
                        </div>
                    </td>
                </tr>
            )
        );
    }

    return (
        <div className="home-page">
            <div className="header-section fade-in--0_5s">
                <MyBio />

                <CurrentEmployment selectSkill={selectSkill}/>
            </div>

            <div className="tech-skills-section fade-in--0_5s">
                <div className="title">
                    <h1>
                        Technologies & Frameworks
                        { selectedSkill.name === 'All' ? (
                            <Tooltip
                                title="The following is only an indication on experience post formal education
                                (i.e. production projects or important side projects)"
                                placement="top"
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            backgroundColor: orange[400],
                                            color: "black"
                                        },
                                    },
                                }}
                            >
                                <Icon style={{ marginLeft: '5px', color: orange[400] }}>notifications</Icon>
                            </Tooltip>
                        ) : null }
                    </h1>
                    <h3 data-test="selected-skill">( {selectedSkill.name} )</h3>
                    {
                        selectedSkill.name !== 'All' && (
                            <h3 className="show-all-skills" onClick={() => setSelectedSkill(SELECTED_SKILL_ALL)}>
                                Show all skills
                            </h3>
                        )
                    }
                </div>

                <div className="content-container">
                    {
                        selectedSkill.name !== SELECTED_SKILL_ALL.name ? renderSpecificSkill() : (
                            <table className="tech-table fade-in--0_4s">
                                <tbody>
                                <tr className="headings">
                                    <th>Technology</th>
                                    <th>Type</th>
                                    <th>Projects</th>
                                    <th>Experience</th>
                                    <th>Confidence</th>
                                </tr>
                                {
                                    renderTechSkills()
                                }
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;