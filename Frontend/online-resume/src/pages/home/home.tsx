import React, {SyntheticEvent, useEffect, useState} from 'react';
import "./home.scss";
import myAvatar from "@/assets/images/my-avatar.jpeg";
import companyLogo from "@/assets/images/company-logo.png";
import IconCard from "@/components/icon-card/icon-card";
import { LinkedIn, GitHub } from '@mui/icons-material';
import {Tooltip, Icon, Rating, Button} from "@mui/material";
import {green, orange, red} from "@mui/material/colors";
import {TechSkill} from "@/interfaces/global-interfaces";
import {SELECTED_SKILL_ALL} from "@/constants/global-constants";
import {useCommonStore} from "@/stores/common-store";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;
import CircularProgressBar from "@/components/progress/circular-progress-bar";
import _ from "lodash";
import axios from "axios";

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
    }, [switchSkill]);

    // TODO: Move to store and use once I have admin working
    const updateSkill = (name: string, key: string, value: string | number | null ) => {
        // TODO: Call api to about skill details
    };

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
                                <span> <a>Project 1</a> - 1 Year </span>
                                <span> <a>Project 1</a> - 1 Year </span>
                                <span> <a>Project 1</a> - 1 Year </span>
                                <span> <a>Project 1</a> - 1 Year </span>
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
                <div className="my-bio">
                    <div className="top-section">
                        <div className="image-container">
                            <img src={myAvatar} alt="my-avatar"/>
                        </div>

                        <div className="content-container">
                            <h1>Who am I?</h1>

                            <p>TLDR; an excellent software engineer and a hard worker.</p>

                            <p>
                                On a serious note, I&apos;m a mid-level software engineer specialising in Go and Typescript (React) and
                                I&apos;m very passionate about development and learning new things.
                            </p>

                            <p>
                                Why do I do this? I get an overwhelming sense of satisfaction from working with a team to build
                                out projects and seeing it flourish. Software development is not only my job but also a hobby which
                                means I get up every morning feeling excited thinking about today&apos;s challenges!
                            </p>
                        </div>
                    </div>

                    <div className="actions-container">
                        <Button variant="contained">
                            <Icon>recommend</Icon>
                            Recommend
                        </Button>
                        <Button variant="contained">
                            <LinkedIn />
                        </Button>
                        <Button variant="contained">
                            <GitHub />
                        </Button>
                    </div>
                </div>

                <div className="current-employment-container">
                    <div className="current-employment">
                        <div className="title-section">
                            <div className="left-section">
                                <h2>Current Employment</h2>
                                <span>Andile Solutions</span>

                                <div className="position">
                                    <h3>Position:</h3>
                                    <span className="position-text">Mid-level Fullstack engineer</span>
                                </div>
                            </div>

                            <div className="right-section">
                                <img src={companyLogo} alt="company-logo"/>
                            </div>
                        </div>

                        <div className="stack-section">
                            <div className="left-section">
                                <h2>Technologies</h2>

                                <div className="technologies-container">
                                    <IconCard icon="go" isCustom size={45} onCardClick={selectSkill} />
                                    <IconCard icon="react" isCustom size={45} onCardClick={selectSkill} />
                                    <IconCard icon="aws" isCustom size={45} onCardClick={selectSkill} />
                                    <IconCard icon="mongodb" isCustom size={45} onCardClick={selectSkill} />
                                </div>
                            </div>

                            <div className="right-section">
                                <Tooltip
                                    title={<div>
                                        Current Job Satisfaction: <span style={{ color: green[300] }}>Happy</span>
                                    </div>}
                                >
                                    <div>
                                        <IconCard icon="mood" size={80} color={green[400]}/>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
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