import companyLogo from "@/assets/images/company-logo.png";
import "./current-employment.scss";
import IconCard from "@/components/util/icon-card/icon-card";
import {CircularProgress, Tooltip} from "@mui/material";
import {green} from "@mui/material/colors";
import React, {Fragment} from "react";
import {useCommonStore} from "@/stores/common-store";
import _ from "lodash";

interface ICurrentEmploymentProps {
    selectSkill: (name: string) => void
}

const CurrentEmployment = (props: ICurrentEmploymentProps) => {
    const { currentEmployment, commonDataLoading } = useCommonStore((state) => state);

    return (
        <div className="current-employment-container">
            <div className="current-employment">
                {
                    commonDataLoading ? (
                        <Fragment>
                            <CircularProgress size="100px" thickness={1.5}/>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className="title-section">
                                <div className="left-section">
                                    <h2>Current Employment</h2>
                                    <span>{currentEmployment.employer}</span>

                                    <div className="position">
                                        <h3>Position:</h3>
                                        <span className="position-text">{currentEmployment.position}</span>
                                    </div>

                                    <div className="current-employment-project">
                                        <h3>Project:</h3>
                                        <span className="position-text">{currentEmployment.project}</span>
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
                                        {
                                            currentEmployment.stack &&
                                            currentEmployment.stack.map(skill => {
                                                return (
                                                    <IconCard key={skill} icon={_.toLower(skill)} isCustom size={45} onCardClick={props.selectSkill} />
                                                );
                                            })
                                        }
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
                        </Fragment>
                    )
                }
            </div>
        </div>
    )
}

export default CurrentEmployment;