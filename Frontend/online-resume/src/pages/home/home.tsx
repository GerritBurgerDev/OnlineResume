import React, {useEffect, useState} from 'react';
import "./home.scss";
import IconCard from "@/components/icon-card/icon-card";
import {Tooltip, Icon, Rating} from "@mui/material";
import {orange} from "@mui/material/colors";
import {TechSkill} from "@/interfaces/global-interfaces";
import {SELECTED_SKILL_ALL} from "@/constants/global-constants";
import {useCommonStore} from "@/stores/common-store";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;
import CircularProgressBar from "@/components/progress/circular-progress-bar";
import _ from "lodash";
import MyBio from "@/components/home/header/my-bio";
import CurrentEmployment from "@/components/home/header/current-employment";

const Home = () => {
    const { commonDataLoading, techSkills, getCommonData } = useCommonStore((state) => state);

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

    const calculateProficiency = (value: number): string => {
        if (value <= 40) {
            return 'Familiar';
        }
        if (value > 40 && value <= 70) {
            return 'Proficient';
        }

        return 'Fluent';
    }

    const getExperienceValue = (experience: string): number => {
        const years = experience.match(/\d+(\syear(s?))/gi)?.at(0)?.match(/\d+/gi)?.at(0) || 0;
        let months = experience.match(/\d+(\smonth(s?))/gi)?.at(0)?.match(/\d+/gi)?.at(0) || 0 ;

        months = parseInt(`${months || 0}`) / 12;

        return ((parseInt(`${years}`) + months) / 5) * 100;
    }

    const renderSpecificSkill = (): JSX.Element => {
        return (
            <div className="specific-skill">
                <div className={`left-section ${ switchSkill ? 'fade-out--0_2s' : 'fade-in--0_2s'}`}>
                    <IconCard icon={selectedSkill.icon} size={300} isCustom />
                </div>
                <div className="right-section">
                    <div className={`left-section ${ switchSkill ? 'fade-out--0_2s' : 'fade-in--0_2s'}`}>
                        <div className="top-section">
                            <h1>About</h1>
                            <div
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => {console.log(e.currentTarget.textContent)}}
                            >
                                {
                                    selectedSkill.about ? selectedSkill.about : <span>No description available.</span>
                                }
                            </div>
                        </div>
                        <div className="bottom-section">
                            <h1>Projects</h1>
                            <div className="projects">
                                <span> <a>Project 1</a> - 1 Year </span>
                            </div>
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="top-section">
                            <div className="experience">
                                <h2>Experience</h2>
                                <CircularProgressBar
                                    size={'120px'}
                                    variant="determinate"
                                    value={getExperienceValue(selectedSkill.experienceDuration)}
                                    thickness={2.5}
                                    icon="schedule"
                                    label={calculateProficiency(getExperienceValue(selectedSkill.experienceDuration))}
                                    labelSize={18}
                                />
                            </div>

                            <div className="confidence">
                                <h2>Confidence</h2>
                                <CircularProgressBar
                                    size={'120px'}
                                    variant="determinate"
                                    value={(selectedSkill.confidence / 5) * 100}
                                    thickness={2.5}
                                    icon="mood"
                                    label={calculateProficiency((selectedSkill.confidence / 5) * 100)}
                                    labelSize={18}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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