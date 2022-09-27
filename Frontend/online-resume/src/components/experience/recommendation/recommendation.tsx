import React from "react";
import "./recommendation.scss";
import {Avatar, Rating} from "@mui/material";
import {IRecommendation} from "@/interfaces/project-interfaces";
import {yellow} from "@mui/material/colors";

const Recommendation = (props: IRecommendation) => {
    return (
      <div className="recommendation">
          <div className="recommendation-avatar-container">
              <Avatar alt={props.author} sx={{ width: 80, height: 80, fontSize: 30, backgroundColor: yellow[700]  }}>
                  {
                      props.author.split(' ').map(word => {
                          return word.charAt(0);
                      }).join('')
                  }
              </Avatar>
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