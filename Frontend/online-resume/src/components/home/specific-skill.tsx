import IconCard from "@/components/util/icon-card/icon-card";
import "./specific-skill.scss";
import {getTimePassed} from "@/helpers/date-helper";
import CircularProgressBar from "@/components/util/progress/circular-progress-bar";
import React from "react";
import {TechSkill} from "@/interfaces/global-interfaces";
import {IProject} from "@/interfaces/project-interfaces";

interface ISpecificSkillProps {
    selectedSkill: TechSkill,
    switchSkill: string,
    projectsForSkill: IProject[],
    loadingProjectForSkill: boolean,
}

const SpecificSkill = (props: ISpecificSkillProps) => {
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

    const getProjectTimePassed = (start: number, end: number) => {
        const timePassed = getTimePassed(start, end);
        let timePassedString = '';

        if (timePassed.years > 0) {
            timePassedString += ` - ${timePassed.years} year${timePassed.years > 1 ? 's' : ''}`;
        }

        if (timePassed.months > 0) {
            timePassedString +=
                `${timePassed.years === 0 ? ' - ' : ''} ${timePassed.months} month${timePassed.months > 1 ? 's' : ''}`;
        }

        return timePassedString;
    }

    return (
        <div className="specific-skill">
            <div className={`left-section ${ props.switchSkill ? 'fade-out--0_2s' : 'fade-in--0_2s'}`}>
                <IconCard icon={props.selectedSkill.icon} size={300} isCustom />
            </div>
            <div className="right-section">
                <div className={`left-section ${ props.switchSkill ? 'fade-out--0_2s' : 'fade-in--0_2s'}`}>
                    <div className="top-section">
                        <h1>About</h1>
                        <div
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => {console.log(e.currentTarget.textContent)}}
                        >
                            {
                                props.selectedSkill.about ? props.selectedSkill.about : <span>No description available.</span>
                            }
                        </div>
                    </div>
                    <div className="bottom-section">
                        <h1>Projects</h1>
                        <div className="projects">
                            {
                                props.loadingProjectForSkill ?
                                    <div>Loading...</div> :
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        {
                                            props.projectsForSkill.map(project => {
                                                return (
                                                    <span key={project.id}> <a>{project.name}</a> {
                                                        getProjectTimePassed(project.startDate, project.endDate)
                                                    } </span>
                                                )
                                            })
                                        }
                                    </div>
                            }
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
                                value={getExperienceValue(props.selectedSkill.experienceDuration)}
                                thickness={2.5}
                                icon="schedule"
                                label={calculateProficiency(getExperienceValue(props.selectedSkill.experienceDuration))}
                                labelSize={18}
                            />
                        </div>

                        <div className="confidence">
                            <h2>Confidence</h2>
                            <CircularProgressBar
                                size={'120px'}
                                variant="determinate"
                                value={(props.selectedSkill.confidence / 5) * 100}
                                thickness={2.5}
                                icon="mood"
                                label={calculateProficiency((props.selectedSkill.confidence / 5) * 100)}
                                labelSize={18}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecificSkill;