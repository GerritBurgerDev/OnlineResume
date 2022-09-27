import React, {useState, SyntheticEvent} from "react";
import "./project.scss";
import moment from "moment";
import IconCard from "@/components/util/icon-card/icon-card";
import {ExpandMore, DoubleArrow} from "@mui/icons-material";
import {Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import Masonry from "@mui/lab/Masonry"
import Recommendation from "@/components/experience/recommendation/recommendation";
import {IProject, IRecommendation} from "@/interfaces/project-interfaces";
import {yellow} from "@mui/material/colors";

const Project = (props: IProject)  => {
    const [recommendations, setRecommendations] = useState<IRecommendation[]>([
        {
            id: 1,
            author: "Tristen Paul",
            relationship: "Co-worker",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            rating: 4.0,
            timestamp: 1663500575,
            project: 'Activate'
        },
        {
            id: 2,
            author: "Tristen Paul",
            relationship: "Co-worker",
            content: "Gerrit is a good developer",
            rating: 3.2,
            timestamp: 1663500575,
            project: 'Activate'
        },
        {
            id: 3,
            author: "Tristen Paul",
            relationship: "Co-worker",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            rating: 4.0,
            timestamp: 1663500575,
            project: 'Activate'
        },
        {
            id: 4,
            author: "Tristen Paul",
            relationship: "Co-worker",
            content: "Gerrit is a good developer",
            rating: 4.4,
            timestamp: 1663500575,
            project: 'Activate'
        }
    ]);


    const displayDate = () => {
        const startDate = moment.unix(props.startDate).format("MM/YYYY");
        const endDate = moment.unix(props.endDate).format("MM/YYYY");

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
                            <IconCard key={tech} icon={tech} isCustom />
                        )
                    })
                }
            </div>

            <div className="recommendations">
                <Accordion disabled={recommendations.length === 0} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        className="accordion-header"
                        expandIcon={<ExpandMore />}
                        aria-controls="recommendations-content"
                        id="recommendations-header"
                    >
                        <div className="title">
                            Recommendations
                        </div>
                        {
                            recommendations.length === 0 ?
                                <div className="sub-title subtle">No recommendations for this project</div>
                                : null
                        }
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="recommendations-container">
                            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                                {
                                    recommendations.map((recommendation: IRecommendation) => {
                                        return (
                                            <Recommendation
                                                key={recommendation.id}
                                                {...recommendation}
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

Project.defaultProps = {
    name: 'BBD Bursar Week',
    employer: 'BBD Software Development',
    position: 'Bursar',
    startDate: 1496278800,
    endDate: 1496624400,
    responsibilities: [
        'Created a website for voting for presenters at a BBD presentation event.',
        'Out of the 4 bursar groups, our group’s project was chosen as the best.'
    ],
    stack: [
        'Javascript',
        'MySQL',
        'PhP'
    ]
}

export default Project;