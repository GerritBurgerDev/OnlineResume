import React, {Fragment, ReactNode} from "react";
import "./recommendation.scss";
import {Avatar, IconButton, Rating} from "@mui/material";
import {IRecommendation} from "@/interfaces/project-interfaces";
import {green, grey, red, yellow} from "@mui/material/colors";
import _ from "lodash";
import {useProfileStore} from "@/stores/profile-store";
import {Check, Delete, Edit} from "@mui/icons-material";
import {useModalStore} from "@/stores/modal-store";
import {MODAL_TYPE_ADD_RECOMMENDATION} from "@/constants/modal-constants";
import {
    RECOMMENDATION_STATE_PENDING,
    RECOMMENDATION_STATE_POSTED,
    RECOMMENDATION_STATE_REJECTED, RECOMMENDATION_STATE_REMOVED
} from "@/constants/project-constants";
import {useProjectsStore} from "@/stores/project-store";
import {useNotificationStore} from "@/stores/notification-store";

interface IRecommendationProps extends IRecommendation {
    projectName?: string,
    projectPosition?: string,
    displayState?: boolean
}

const Recommendation = (props: IRecommendationProps) => {
    const { updateRecommendationState, getAllRecommendations } = useProjectsStore();
    const profileData = useProfileStore((state) => state.profileData);
    const { openModal } = useModalStore();
    const { openNotification } = useNotificationStore();

    const renderRecommendationState = (): ReactNode => {
        if (!props.displayState) return null;

        return (
            <div className={`recommendation-state-button ${props.state}`}>
                {_.upperFirst(props.state)}
            </div>
        )
    }

    const editRecommendation = () => {
        openModal(MODAL_TYPE_ADD_RECOMMENDATION, props);
    }

    const updateRecommendation = (state: string) => {
        updateRecommendationState({
            ...props,
            state: state
        }).then(() => {
            openNotification({
                color: 'success',
                content: 'Successfully updated recommendation.'
            });

            getAllRecommendations().catch(() => { /* DONE */ });
        }).catch(() => {
            openNotification({
                color: 'error',
                content: 'Could not update recommendation.'
            });
        });
    }

    return (
      <div className="recommendation">
          <div className="recommendation-state">
              {
                  renderRecommendationState()
              }
          </div>

          <div className="recommendation-avatar-container">
              {
                  props.authorAvatar ?
                      <img src={props.authorAvatar} alt="author-avatar" style={{ width: 80, height: 80 }}/> :
                      <Avatar alt={props.author} sx={{ width: 80, height: 80, fontSize: 30, backgroundColor: yellow[700]  }}>
                          {
                              props.author.split(' ').map(word => {
                                  return word.charAt(0);
                              }).join('')
                          }
                      </Avatar>
              }
          </div>

          {
              profileData && props.authorId === profileData.email && props.state === RECOMMENDATION_STATE_PENDING ?
                  <div className="edit-button">
                      <IconButton sx={{ color: grey[100] }} onClick={editRecommendation}>
                          <Edit/>
                      </IconButton>
                  </div> :
                  null
          }

          {
              profileData && profileData.isAdmin ?
                  <div className="edit-button">
                      {
                          props.state === RECOMMENDATION_STATE_PENDING ? (
                              <Fragment>
                                  <IconButton
                                      sx={{
                                          color: green[500],
                                          border: `1.5px solid ${green[500]}`,
                                          ':hover': {
                                              filter: `drop-shadow(0 0 5px ${green[500]})`
                                          }
                                      }}
                                      onClick={() => updateRecommendation(RECOMMENDATION_STATE_POSTED)}
                                  >
                                      <Check />
                                  </IconButton>
                                  <IconButton
                                      sx={{
                                          color: red[700],
                                          border: `1.5px solid ${red[700]}`,
                                          ':hover': {
                                              filter: `drop-shadow(0 0 5px ${red[700]})`
                                          }
                                      }}
                                      onClick={() => updateRecommendation(RECOMMENDATION_STATE_REJECTED)}
                                  >
                                      <Edit/>
                                  </IconButton>
                              </Fragment>
                          ) : null
                      }
                      {
                          props.state === RECOMMENDATION_STATE_POSTED ? (
                              <IconButton
                                  sx={{
                                      color: red[700],
                                      border: `1.5px solid ${red[700]}`,
                                      ':hover': {
                                          filter: `drop-shadow(0 0 5px ${red[700]})`
                                      }
                                  }}
                                  onClick={() => updateRecommendation(RECOMMENDATION_STATE_REMOVED)}
                              >
                                  <Delete />
                              </IconButton>
                          ): null
                      }
                  </div> :
                  null
          }

          <div className="recommendation-project-details">
              {
                  props.projectName ? <h3>{props.projectName}</h3> : ''
              }
              {
                  props.projectName ? <h4>{props.projectPosition}</h4> : ''
              }
          </div>
          <div className="recommendation-description-container">
              &quot;{props.content}&quot;
          </div>
          <div className="recommendation-user-info-container">
              <h3>{props.author}</h3>
              <h4>{props.relationship}</h4>
          </div>
          <div className="recommendation-rating-container">
              <h2 style={{ color: yellow[600] }}>{props.rating.toFixed(1)}</h2>
              <Rating
                  name="user-rating"
                  value={props.rating}
                  sx={{
                      color: yellow[600],
                      filter: `drop-shadow(0px 0px 5px rgba(253 216 53 / 0.6))`
                    }}
                  precision={0.5}
                  readOnly
              />
          </div>
      </div>
    );
}

export default Recommendation;