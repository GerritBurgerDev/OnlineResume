import React, {useState, SyntheticEvent, useEffect} from "react";
import "./project.scss";
import moment from "moment";
import IconCard from "@/components/util/icon-card/icon-card";
import {ExpandMore, DoubleArrow} from "@mui/icons-material";
import {Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import Masonry from "@mui/lab/Masonry"
import Recommendation from "@/components/experience/recommendation/recommendation";
import {IProject, IRecommendation} from "@/interfaces/project-interfaces";
import {yellow} from "@mui/material/colors";
import {MAP_SKILL_NAME_TO_ICON, MAX_TIMESTAMP} from "@/constants/global-constants";
import {useProjectsStore} from "@/stores/project-store";

const Project = (props: IProject)  => {
    const { recommendations, getRecommendationsForProject } = useProjectsStore();

    const [displayRecommendations, setRecommendations] = useState<IRecommendation[]>([]);

    useEffect(() => {
        getRecommendationsForProject(props.id)
            .then((response: IRecommendation[] | undefined) => {
                if (!response || response.length === 0) {
                    setExpanded(false);
                }

                setRecommendations(response || []);
            })
            .catch(() => { /* DONE */ });
    }, [recommendations]);

    const displayDate = () => {
        const startDate = moment.unix(props.startDate).format("MM/YYYY");
        let endDate = moment.unix(props.endDate).format("MM/YYYY");

        if (props.endDate === MAX_TIMESTAMP) {
            endDate = moment.unix(moment().unix()).format("MM/YYYY");
        }

        return `${startDate} - ${endDate}`;
    }

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="project">
            <div className="header">
                <h3>{props.name}</h3>
                <h3>{props.employer}</h3>
                <h4>{displayDate()}</h4>
            </div>

            <div className="position">
                <h3>Position: </h3>
                <span>{props.position}</span>
            </div>

            <div className="responsibilities">
                <h2>Responsibilities</h2>
                <ul>
                    {
                        props.responsibilities.map((item: string, index: number) => {
                            return (
                                <li key={index}><DoubleArrow sx={{ fontSize: '16px', color: yellow[700] }} /> {item}</li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className="stack">
                {
                    props.stack.map(tech => {
                        return (
                            <IconCard key={tech} icon={MAP_SKILL_NAME_TO_ICON[tech]} isCustom />
                        )
                    })
                }
            </div>

            <div className="recommendations">
                <Accordion disabled={displayRecommendations.length === 0} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        className="accordion-header"
                        expandIcon={<ExpandMore />}
                        disabled={props.name === 'OnlineResume'}
                        aria-controls="recommendations-content"
                        id="recommendations-header"
                    >
                        <div className="title">
                            Recommendations
                        </div>
                        {
                            (displayRecommendations.length === 0 || props.name === 'OnlineResume') ?
                                <div className="sub-title subtle">No recommendations for this project</div>
                                : null
                        }
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="recommendations-container">
                            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                                {
                                    displayRecommendations.map((recommendation: IRecommendation) => {
                                        return (
                                            <Recommendation
                                                key={recommendation.id}
                                                {...recommendation}
                                                projectName={props.name}
                                                projectPosition={props.position}
                                            />
                                        )
                                    })
                                }
                            </Masonry>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
};

export default Project;