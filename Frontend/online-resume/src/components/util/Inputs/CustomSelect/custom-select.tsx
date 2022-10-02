import {
    alpha,
    FormControl,
    FormHelperText,
    InputBase,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    SelectProps
} from "@mui/material";
import {blue, grey, red} from "@mui/material/colors";
import React, {CSSProperties, ReactNode} from "react";
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
    '&.Mui-error': {
        border: `2px solid ${red[700]}`,
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
            maxHeight: '200px'
        },
        "& li": {
            fontSize: 16,
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

interface ICustomSelectProps extends SelectProps {
    items: ISelectItem[],
    style?: CSSProperties,
    helperText?: ReactNode,
    onSelectChange: (event: SelectChangeEvent) => void
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                value={props.value}
                onChange={(e: SelectChangeEvent) => props.onSelectChange(e)}
                input={<CustomInput error={props.error} />}
                multiple={props.multiple}
                MenuProps={{ classes: { paper: classes.select } }}
            >
                {
                    !props.multiple && (
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                    )
                }
                {
                    props.items.map((item: ISelectItem) => {
                        return (
                            <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                        )
                    })
                }
            </Select>
            {
                props.helperText && (
                    <FormHelperText style={{ color: `${props.error ? red[700] : grey[100]}`}}>
                        {props.helperText}
                    </FormHelperText>
                )
            }
        </FormControl>
    )
}

export default CustomSelect;