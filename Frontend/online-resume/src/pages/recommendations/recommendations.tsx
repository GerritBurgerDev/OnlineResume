import React, {useState} from "react";
import "./recommendations.scss";
import {Button} from "@mui/material";
import {red} from "@mui/material/colors";
import {Add} from "@mui/icons-material";
import {IProject, IRecommendation} from "@/interfaces/project-interfaces";
import Recommendation from "@/components/experience/recommendation/recommendation";
import Masonry from "@mui/lab/Masonry";
import {TEMP_RECOMMENDATIONS} from "@/constants/global-constants";
import {useProjectsStore} from "@/stores/project-store";
import {useModalStore} from "@/stores/modal-store";
import {MODAL_TYPE_ADD_RECOMMENDATION} from "@/constants/modal-constants";

const Recommendations = () => {
    const { projects } = useProjectsStore((state) => state);
    const { openModal } = useModalStore((state) => state);

    const [recommendations, setRecommendations] = useState<IRecommendation[]>(TEMP_RECOMMENDATIONS);

    const getProject = (id: number): IProject | undefined => {
        return projects.find((project: IProject) => project.id === id);
    }

    return (
        <div className="recommendations-page fade-in--1s">
            <div className="recommendations-page-my-recommendations">
                <div className="header">
                    <h1>My Recommendations</h1>
                    <Button
                        variant={"contained"}
                        onClick={() => openModal(MODAL_TYPE_ADD_RECOMMENDATION)}
                        sx={{
                            backgroundColor: red[700],
                            ":hover": {
                                backgroundColor: red[400]
                            }
                        }}
                    >
                        <Add/> Recommend
                    </Button>
                </div>
                <div className="container">
                    <h3>No recommendations yet. Maybe add one?</h3>
                </div>
            </div>


            <div className="recommendations-page-all-recommendations">
                <div className="header">
                    <h1>All Recommendations</h1>
                </div>
                <div className="container">
                    <Masonry columns={{ xs: 1, sm: 3, md: 4 }} spacing={2}>
                        {
                            recommendations.map((recommendation: IRecommendation) => {
                                return (
                                    <Recommendation
                                        key={recommendation.id}
                                        {...recommendation}
                                        projectName={getProject(recommendation.projectId)?.name}
                                        projectPosition={getProject(recommendation.projectId)?.position}
                                    />
                                )
                            })
                        }
                    </Masonry>
                </div>
            </div>
        </div>
    );
}

export default Recommendations;