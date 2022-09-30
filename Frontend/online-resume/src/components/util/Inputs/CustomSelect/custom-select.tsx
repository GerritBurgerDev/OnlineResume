import {alpha, FormControl, InputBase, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {blue, grey} from "@mui/material/colors";
import React, {CSSProperties} from "react";
import {makeStyles} from "@mui/styles";
import {styled} from "@mui/material/styles";
import {ISelectItem} from "@/interfaces/global-interfaces";

const CustomInput = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        position: 'relative',
        color: grey[100],
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
    '&:not(.Mui-focused)': {
        border: `1px solid ${grey[100]}`,
        borderRadius: 4,
    },
    '&.Mui-focused': {
        border: `2px solid ${blue[600]}`,
        borderRadius: 4,
    },
    '& .MuiSvgIcon-root': {
        color: grey[100]
    }
}));

const useStyles = makeStyles({
    select: {
        backgroundColor: grey[700],
        marginTop: '1.5px',
        borderRadius: 4,
        "& ul": {
            backgroundColor: grey[700],
        },
        "& li": {
            fontSize: 15,
            color: grey[100],
            "&:hover": {
                backgroundColor: alpha(grey[900], 0.3),
            },
            "&.Mui-selected": {
                backgroundColor: alpha(grey[100], 0.2),
                "&:hover": {
                    backgroundColor: alpha(grey[900], 0.3),
                }
            }
        },
    }
});

interface ICustomSelectProps {
    items: ISelectItem[],
    style?: CSSProperties,
    label: string,
    value: string,
    onChange: (event: SelectChangeEvent) => void
}

const CustomSelect = (props: ICustomSelectProps) => {
    const classes = useStyles();

    return (
        <FormControl
            style={props.style}
            sx={{ m: 1 }}
        >
            <InputLabel
                id="demo-customized-select-label"
                sx={{
                    color: 'white',
                    top: '-6px',
                    "&.Mui-focused, &.MuiFormLabel-filled": {
                        left: '-5px',
                        top: '0',
                        backgroundColor: grey[800],
                        padding: '0 10px'
                    }
                }}
            >{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={props.value}
                onChange={(e: SelectChangeEvent) => props.onChange(e)}
                input={<CustomInput />}
                MenuProps={{ classes: { paper: classes.select } }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {
                    props.items.map((item: ISelectItem) => {
                        return (
                            <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}

export default CustomSelect;