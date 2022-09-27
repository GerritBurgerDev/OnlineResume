import React, {useEffect, useState} from 'react';
import './circular-progress-bar.scss';
import {CircularProgress, Icon} from "@mui/material";
import {CircularProgressProps} from "@mui/material/CircularProgress/CircularProgress";
import {green, orange, red, grey} from "@mui/material/colors";

interface CircularProgressBarProps extends CircularProgressProps {
    icon?: JSX.Element | string,
    iconSize?: string | number,
    isCustomIcon?: boolean,
    label?: string,
    labelSize?: string | number,
}

const CircularProgressBar = (props: CircularProgressBarProps) => {
    const [iconSize, setIconSize] = useState<string | number>(`calc(${props.size || 0}/2)`);
    const [progress, setProgress] = useState<number>(0);
    const [progressColor, setProgressColor] = useState<string>('');

    useEffect(() => {
        setProgress(props.value || 0);

        if (progress <= 40) {
            setProgressColor(red[400]);
        } else if (progress > 40 && progress <= 70) {
            setProgressColor(orange[400]);
        } else {
            setProgressColor(green[400]);
        }

        return () => {
            setProgress(0);
        }
    }, [progress, props.value]);

    useEffect(() => {
        return () => {
            setProgress(0);
        }
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value, labelSize, ...newProps } = props;

    useEffect(() => {
        if (props.iconSize) {
            setIconSize(props.iconSize);
        }
    }, [props.iconSize]);

    return (
        <div className="circular-progress-bar" style={{
            width: props.size,
            height: `calc(${props.size || 0})`,
        }}>
            <CircularProgress value={progress} {...newProps} style={{
                transition: '',
                color: progressColor
            }} />
            {
                props.icon && (
                    <div className="icon-container">
                        {
                            typeof props.icon === 'string' ?
                                props.isCustomIcon ?
                                    <img src={`/svgs/${props.icon}.svg`} alt={`${props.icon}-icon`} style={{ width: iconSize, height: iconSize }}/>
                                    : <Icon style={{ fontSize: iconSize, color: grey[400] }}>{props.icon}</Icon>
                                : props.icon
                        }
                    </div>
                )
            }
            <span className="label" style={{
                top: `calc((${props.size || 0}) + 5px)`,
                fontSize: labelSize
            }}>
                {props.label}
            </span>
        </div>
    )
};

CircularProgressBar.defaultProps = {
    size: '32px'
}

export default CircularProgressBar;