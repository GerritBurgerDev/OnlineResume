import "./icon-card.scss";
import { Icon } from "@mui/material";
import "@mui/icons-material";
import React from "react";

type IconCardProps = {
    icon: string,
    isCustom: boolean,
    size: number
}

const IconCard = (props: IconCardProps) => {
    const getElementStyle: () => React.CSSProperties = () => {
        return {
            width: `${props.size}px`,
            height: `${props.size}px`,
        }
    }

    const getIcon: () => (JSX.Element) = () => {
        if (props.isCustom) {
            return (
                <img src={`/svgs/${props.icon}.svg`} alt={`${props.icon}-icon`}/>
            )
        }

        return (
            <Icon>{props.icon}</Icon>
        )
    }

    return (
        <div className="icon-card" style={getElementStyle()}>
            {getIcon()}
        </div>
    )
}

IconCard.defaultProps = {
    size: 64
}

export default IconCard;