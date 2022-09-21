import React, {SyntheticEvent, useEffect, useState} from 'react';
import "./home.scss";
import myAvatar from "@/assets/images/my-avatar.jpeg";
import companyLogo from "@/assets/images/company-logo.png";
import IconCard from "@/components/icon-card/icon-card";
import {Tooltip, Icon, Rating} from "@mui/material";
import {green, orange} from "@mui/material/colors";
import {TechSkill} from "@/interfaces/global-interfaces";
import {ALL_SKILLS, SELECTED_SKILL_ALL} from "@/constants/global-constants";
import {GlobalClient} from "@/services/global.service";

const Home = () => {
    const [selectedSkill, setSelectedSkill] = useState<TechSkill>(SELECTED_SKILL_ALL);
    const [allSkills, setAllSkills] = useState<TechSkill[]>([]);

    const selectSkill = (name: string) => {
        setSelectedSkill(ALL_SKILLS[name]);
    };

    const updateSkill = (name: string, key: string, value: string | number | null ) => {
        const updatedSkills: TechSkill[] = [
            ...allSkills
        ];

        const skillIndex = updatedSkills.findIndex((skill: TechSkill) => skill.name === name);

        if (skillIndex > -1) {
            updatedSkills[skillIndex] = {
                ...updatedSkills[skillIndex],
                [key]: value
            };
        }

        setAllSkills(updatedSkills);
    };

    useEffect(() => {
        const globalService = new GlobalClient();

        const fetchTechSkills = async () => {
            const data = await globalService.getCommonData();

            setAllSkills(Object.values(data.techSkills));
        }

        fetchTechSkills().catch(() => { /* DONE */ });
    }, []);

    return (
        <div className="home-page">
            <div className="header-section">
                <div className="my-bio">
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
                                    <IconCard icon="go" isCustom size={45}/>
                                    <IconCard icon="react" isCustom size={45}/>
                                    <IconCard icon="aws" isCustom size={45}/>
                                    <IconCard icon="mongodb" isCustom size={45}/>
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

            <div className="tech-skills-section">
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
                    <table className="tech-table">
                        <tbody>
                            <tr className="headings">
                                <th>Technology</th>
                                <th>Type</th>
                                <th>Projects</th>
                                <th>Experience</th>
                                <th>Confidence</th>
                            </tr>
                            {
                                allSkills.map((skill: TechSkill) => {
                                    return (
                                        <tr key={skill.name}>
                                            <td className="tech-skill" data-test="tech-skill" onClick={ () => selectSkill(skill.icon) }>
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
                                                    onChange={(event: SyntheticEvent, newValue: number | null) => {
                                                        updateSkill(skill.name, 'confidence', newValue)
                                                    }}
                                                    precision={0.5}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home;