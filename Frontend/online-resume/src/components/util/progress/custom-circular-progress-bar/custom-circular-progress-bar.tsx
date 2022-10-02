import React, {CSSProperties} from "react";
import "./custom-circular-progress-bar.scss";
import {green, orange, red} from "@mui/material/colors";

const CustomCircularProgressBar = () => {

    const calcProgress = (percent: number): number => {
        return 440 * ((100 - (percent))/100);
    }

    return (
        <div
            className="custom-circular-progress-bar"
            style={{ "--progress-percentage": calcProgress(100)} as CSSProperties}
        >
            <svg className="progressbar-svg">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor={red[700]} />
                        <stop offset="50%" stopColor={orange[500]} />
                        <stop offset="100%" stopColor={green[400]} />
                    </linearGradient>
                </defs>
                <circle
                    cx="80" cy="80" r="70"
                    className="progressbar-svg-circle circle shadow"
                    stroke="url(#gradient)"
                ></circle>
            </svg>
            <span className="progressbar-text shadow">HTML</span>
        </div>
    )
}

export default CustomCircularProgressBar;