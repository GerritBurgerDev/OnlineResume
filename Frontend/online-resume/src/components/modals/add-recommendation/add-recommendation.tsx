import React, {useState} from "react";
import "./add-recommendation.scss";
import {alpha, SelectChangeEvent, SxProps, TextField} from "@mui/material";
import CustomSelect from "@/components/util/Inputs/CustomSelect/custom-select";
import {ISelectItem} from "@/interfaces/global-interfaces";
import {blue, grey} from "@mui/material/colors";

const customTextSxProps: SxProps = {
    margin: '8px',
    "& label": {
        top: '-4px',
        color: alpha(grey[100], 0.5),
        "&.Mui-focused": {
            top: '0',
        }
    },
    "& textarea": {
      margin: '-12px -14px'
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: blue[700]
    },
    "& .MuiInputBase-input": {
        color: grey[100],
        padding: '12px 14px',
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: grey[100]
    }
}

const AddRecommendation = () => {
    const items: ISelectItem[] = [
        {
            label: 'Some Project 1',
            value: 'Some Project 1'
        },
        {
            label: 'Some Project 2',
            value: 'Some Project 2'
        },
        {
            label: 'Some Project 3',
            value: 'Some Project 3'
        }
    ]
    const [project, setProject] = useState<string>('');

    const handleProjectChange = (event: SelectChangeEvent) => {
        setProject(event.target.value);
    };

    return (
        <div className="add-recommendation-modal">
            <h2>Add recommendation</h2>

            <CustomSelect
                style={{ width: '300px' }}
                label="Select Project"
                items={items}
                value={project}
                onChange={(e: SelectChangeEvent) => handleProjectChange(e)}
            />
            <TextField
                style={{ width: '300px' }}
                sx={customTextSxProps}
                id="my-position"
                label="My Position"
                variant="outlined"
            />
            <TextField
                sx={customTextSxProps}
                id="recommendation-text"
                label="Recommendation"
                variant="outlined"
                multiline
                rows={6}
            />
            <TextField
                style={{ width: '300px' }}
                sx={customTextSxProps}
                id="your-name"
                label="Your Name"
                variant="outlined"
            />
            <TextField
                style={{ width: '300px' }}
                sx={customTextSxProps}
                id="relationship"
                label="Relationship"
                variant="outlined"
            />
        </div>
    );
}

export default AddRecommendation;