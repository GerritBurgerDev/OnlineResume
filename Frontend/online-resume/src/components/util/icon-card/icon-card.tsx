import "./icon-card.scss";
import { Icon } from "@mui/material";
import "@mui/icons-material";
import React from "react";

interface IconCardProps {
    icon: string,
    isCustom?: boolean,
    size: number,
    color?: string,
    canHover?: boolean,
    onCardClick?: (name: string) => void,
}

const IconCard = (props: IconCardProps) => {
    const getElementStyle = (): React.CSSProperties => {
        return {
            width: `${props.size}px`,
            height: `${props.size}px`,
        }
    }

    const getIcon = (): JSX.Element => {
        if (props.isCustom) {
            return (
                <img src={`/svgs/icons/${props.icon}.svg`} alt={`${props.icon}-icon`}/>
            )
        }

        return (
            <Icon sx={{ fontSize: props.size, color: props.color }}>{props.icon}</Icon>
        )
    }

    const onCardClick = () => {
        if (props.onCardClick) {
            props.onCardClick(props.icon);
        }
    }

    return (
        <div
            className={`icon-card ${props.canHover ? 'can-hover' : ''}`}
            style={getElementStyle()}
            onClick={() => onCardClick()}
        >
            {getIcon()}
        </div>
    )
}

IconCard.defaultProps = {
    size: 64,
    color: 'white'
}

export default IconCard;