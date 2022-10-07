import React, {Fragment, useEffect, useState} from "react";
import "./recommendations.scss";
import {Button} from "@mui/material";
import {red} from "@mui/material/colors";
import {Add} from "@mui/icons-material";
import {IProject, IRecommendation} from "@/interfaces/project-interfaces";
import Recommendation from "@/components/experience/recommendation/recommendation";
import Masonry from "@mui/lab/Masonry";
import {useProjectsStore} from "@/stores/project-store";
import {useModalStore} from "@/stores/modal-store";
import {MODAL_TYPE_ADD_RECOMMENDATION} from "@/constants/modal-constants";
import {useProfileStore} from "@/stores/profile-store";
import {RECOMMENDATION_STATE_PENDING} from "@/constants/project-constants";
import {useLocation} from "react-router-dom";
import {LOCATION} from "@/constants/global-constants";

interface IRecommendationsProps {
    displayOnlyAll?: boolean
}

const Recommendations = (props: IRecommendationsProps) => {
    const { profileData } = useProfileStore((state) => state);
    const { projects, getAllProjects, recommendations, getAllRecommendations, getPostedRecommendations } = useProjectsStore();
    const { openModal } = useModalStore((state) => state);

    const isAdmin = (): boolean => {
        return profileData?.isAdmin || false;
    }

    const [myRecommendations, setMyRecommendations] = useState<IRecommendation[]>([]);

    const updateMyRecommendations = (recommendations: IRecommendation[]) => {
        if (profileData) {
            if (!isAdmin()) {
                setMyRecommendations(recommendations.filter(recommendation => recommendation.authorId === profileData?.email));
            }

            if (isAdmin()) {
                setMyRecommendations(recommendations.filter(recommendation => recommendation.state === RECOMMENDATION_STATE_PENDING));
            }
        }
    }

    const location = useLocation();

    useEffect(() => {
        getAllProjects().catch(() => { /* Called */ });

        if (location.pathname === LOCATION.recommendations) {
            getAllRecommendations().catch(() => { /* Called */ });
        }

    }, [profileData]);

    useEffect(() => {
        updateMyRecommendations(recommendations);
    }, [recommendations]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-recommendation');
                } else {
                    entry.target.classList.remove('show-recommendation');
                }
            })
        }, {
            rootMargin: "50%",
            threshold: 0.1
        });

        const recommendationElements = document.querySelectorAll('.hidden-recommendation');
        recommendationElements.forEach((el: Element) => observer.observe(el));
    }, []);

    const getProject = (id: number | number[]): IProject | undefined => {
        if (Array.isArray(id)) {
            return;
        }

        return projects.find((project: IProject) => project.id === id);
    }

    return (
        <div className="recommendations-page fade-in--1s">
            {
                !props.displayOnlyAll ? (
                    <Fragment>
                        {
                            profileData && isAdmin() ?(
                                <div className="recommendations-page-my-recommendations">
                                    <div className="header">
                                        <h1>Pending Recommendations</h1>
                                    </div>
                                    <div className="container">
                                        {
                                            myRecommendations.length > 0 ?
                                                <Masonry columns={{ xs: 1, sm: 3, md: 4 }} spacing={2}>
                                                    {
                                                        myRecommendations.map((recommendation: IRecommendation) => {
                                                            return (
                                                                <div
                                                                    key={`pending-recommendation-${recommendation.id || 0}`}
                                                                    // className="hidden-recommendation"
                                                                >
                                                                    <Recommendation
                                                                        {...recommendation}
                                                                        projectName={getProject(recommendation.projectId || 0)?.name}
                                                                        projectPosition={recommendation.positionAtTheTime}
                                                                        displayState
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </Masonry> :
                                                <h3>No recommendations are pending.</h3>
                                        }
                                    </div>
                                </div>
                            ) : null
                        }

                        {
                            profileData && !isAdmin() ?(
                                <div className="recommendations-page-my-recommendations">
                                    <div className="header">
                                        <h1>My Recommendations</h1>
                                        <Button
                                            variant={"contained"}
                                            onClick={() => openModal(MODAL_TYPE_ADD_RECOMMENDATION)}
                                            sx={{
                                                backgroundColor: red[700],
                                            }}
                                        >
                                            <Add/> Recommend
                                        </Button>
                                    </div>
                                    <div className="container">
                                        {
                                            myRecommendations.length > 0 ?
                                                <Masonry columns={{ xs: 1, sm: 3, md: 4 }} spacing={2}>
                                                    {
                                                        myRecommendations.map((recommendation: IRecommendation) => {
                                                            return (
                                                                <div
                                                                    key={`my-recommendation-${recommendation.id || 0}`}
                                                                    // className="hidden-recommendation"
                                                                >
                                                                    <Recommendation
                                                                        {...recommendation}
                                                                        projectName={getProject(recommendation.projectId || 0)?.name}
                                                                        projectPosition={recommendation.positionAtTheTime}
                                                                        displayState
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </Masonry> :
                                                <h3>No recommendations yet. Maybe add one?</h3>
                                        }
                                    </div>
                                </div>
                            ) : null
                        }
                    </Fragment>
                ) : null
            }

            <div className="recommendations-page-all-recommendations">
                <div className="header">
                    <h1>All Recommendations</h1>
                </div>
                <div className="container">
                    <Masonry columns={{ xs: 1, sm: 3, md: 4 }} spacing={2}>
                        {
                            getPostedRecommendations().map((recommendation: IRecommendation) => {
                                return (
                                    <div key={`public-${recommendation.id || 0}`} className="hidden-recommendation">
                                        <Recommendation
                                            {...recommendation}
                                            projectName={getProject(recommendation.projectId || 0)?.name}
                                            projectPosition={recommendation.positionAtTheTime}
                                        />
                                    </div>
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