import {alpha, BaseTextFieldProps, SxProps, TextField} from "@mui/material";
import React, {ChangeEvent} from "react";
import {grey} from "@mui/material/colors";

const customTextSxProps: SxProps = {
    margin: '8px',
    "& label": {
        top: '-4px',
        color: alpha(grey[100], 0.5),
        "&.Mui-focused, &.MuiFormLabel-filled": {
            top: '0',
            color: grey[50],
        }
    },
    "& textarea": {
        margin: '-12px -14px'
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: `2px solid ${grey[50]}`
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        border: `2px solid ${grey[50]}`
    },
    "& .MuiInputBase-input": {
        color: grey[100],
        padding: '12px 14px',
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: grey[100],
    }
}

interface ICustomInputProps extends BaseTextFieldProps {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
}

const CustomInput = (props: ICustomInputProps) => {
    return (
        <TextField
            {...props}
            sx={customTextSxProps}
            onChange={props.onChange}
        />
    )
}

export default CustomInput;