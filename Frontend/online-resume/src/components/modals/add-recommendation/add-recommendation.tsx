import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import "./add-recommendation.scss";
import {Button, Icon, Rating, SelectChangeEvent, Tooltip} from "@mui/material";
import CustomSelect from "@/components/util/Inputs/CustomSelect/custom-select";
import {ISelectItem} from "@/interfaces/global-interfaces";
import CustomInput from "@/components/util/Inputs/CustomInput/custom-input";
import {useProjectsStore} from "@/stores/project-store";
import {IProject} from "@/interfaces/project-interfaces";
import _ from "lodash";
import {useProfileStore} from "@/stores/profile-store";
import {orange, red, yellow} from "@mui/material/colors";
import {HelpOutline} from "@mui/icons-material";

interface IAddRecommendationProps {
    isEdit?: boolean
    projectName?: string,
    projectPosition?: string,
    content?: string,
    author?: string,
    relationship?: string,
    rating?: number,
}

const AddRecommendation = (props: IAddRecommendationProps) => {
    const { profileData } = useProfileStore((state) => state);
    const { projects, getAllProjects } = useProjectsStore((state) => state);
    const [projectItems, setProjectitems] = useState<ISelectItem[]>([]);

    const [modalLoading, setModalLoading] = useState(false);

    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    const [position, setPosition] = useState<string>('');
    const [recommendation, setRecommendation] = useState<string>('');
    const [yourName, setYourName] = useState<string | null>('');
    const [relationship, setRelationship] = useState<string>('');
    const [rating, setRating] = useState<number | null>(0);

    const handleProjectChange = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;

        setSelectedProjects(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handlePositionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPosition(event.target.value);
    }

    const handleRecommendationChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRecommendation(event.target.value);
    }

    const handleYourNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setYourName(event.target.value);
    }

    const handleRelationshipChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRelationship(event.target.value);
    }

    useEffect(() => {
        setModalLoading(true);

        if (!props.isEdit) {
            const fetchProjects = async () => {
                await getAllProjects();
            }

            fetchProjects().catch(() => { /* DONE */ });

            const items: ISelectItem[] = projects.map((project: IProject) => {
                return {
                    label: project.name,
                    value: project.name
                }
            });

            setProjectitems(_.sortBy(items, 'label'));
            setYourName(profileData?.name || '');
        } else {
            setSelectedProjects([props.projectName || '']);
            setYourName(props.author || '');
            setRecommendation(props.content || '');
            setRating(props.rating || 0);
            setRelationship(props.relationship || '');
            setPosition(props.projectPosition || '');
        }

        setModalLoading(false);
    }, []);

    const [hasClickedSubmit, setHasClickedSubmit] = useState(false);

    const handleSubmit = () => {
        setHasClickedSubmit(true);

        if (selectedProjects.length === 0 || !position
            || !yourName || !relationship || !recommendation || !rating) {
            return;
        }
    }

    return (
        <div className="add-recommendation-modal fade-in--1s">
            <h2>Add recommendation</h2>

            {
                modalLoading ?
                    <div>Loading...</div> :
                    (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p>
                                <b>Please note: </b> Your recommendation will be in a pending state until approved.
                            </p>

                            {
                                props.isEdit ?
                                    <div className="add-recommendation-modal-edit-project-name">
                                        <h3>Project: </h3><span>{props.projectName}</span>
                                    </div> :
                                    <div style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
                                        <CustomSelect
                                            error={hasClickedSubmit && selectedProjects.length === 0}
                                            helperText={(hasClickedSubmit && selectedProjects.length === 0) && 'Please select the projects for the recommendation.'}
                                            style={{ width: '300px' }}
                                            label="Select Projects"
                                            items={projectItems}
                                            multiple
                                            value={selectedProjects}
                                            onSelectChange={handleProjectChange}
                                            readOnly={props.isEdit}
                                        />
                                        <Tooltip
                                            title={
                                                <div>
                                                    You can select more than one project, <b>however</b>, this will create
                                                    duplicate recommendations for each project since recommendations are linked
                                                    to individual projects.
                                                </div>
                                            }
                                            placement="right"
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        fontSize: 12
                                                    },
                                                },
                                            }}
                                        >
                                            <HelpOutline sx={{ ":hover": { color: red[700], cursor: 'pointer' } }}/>
                                        </Tooltip>
                                    </div>
                            }
                            <CustomInput
                                error={hasClickedSubmit && !yourName}
                                helperText={(hasClickedSubmit && !yourName) && 'Please specify your name.'}
                                style={{ width: '300px' }}
                                id="your-name"
                                label="Your Name"
                                variant="outlined"
                                defaultValue={props.isEdit ? props.author : profileData?.name}
                                onChange={handleYourNameChange}
                            />
                            <CustomInput
                                error={hasClickedSubmit && !position}
                                helperText={(hasClickedSubmit && !position) && 'Please specify my position at the time.'}
                                style={{ width: '300px' }}
                                id="my-position"
                                label="My Position"
                                variant="outlined"
                                defaultValue={props.isEdit ? props.projectPosition : ''}
                                onChange={handlePositionChange}
                            />
                            <CustomInput
                                error={hasClickedSubmit && !relationship}
                                helperText={(hasClickedSubmit && !relationship) && 'Please specify your position at the time.'}
                                style={{ width: '300px' }}
                                id="your-position"
                                label="Your Position"
                                variant="outlined"
                                defaultValue={props.isEdit ? props.relationship : ''}
                                onChange={handleRelationshipChange}
                            />
                            <CustomInput
                                error={hasClickedSubmit && !recommendation}
                                helperText={(hasClickedSubmit && !recommendation) && 'Please take some time to fill out the recommendation.'}
                                id="recommendation-text"
                                label="Recommendation"
                                variant="outlined"
                                multiline
                                rows={6}
                                defaultValue={props.isEdit ? props.content : ''}
                                onChange={handleRecommendationChange}
                            />
                            <div className="user-rating">
                                <h3 className="label">
                                    Please rate my skills
                                    {
                                        hasClickedSubmit && rating === 0 ?
                                            <span style={{ color: red[400], fontSize: 15, marginLeft: 10 }}>*required</span> :
                                            null
                                    }
                                </h3>
                                <Rating
                                    name="simple-controlled"
                                    sx={{
                                        color: yellow[600],
                                        filter: `drop-shadow(0px 0px 5px rgba(253 216 53 / 0.6))`
                                    }}
                                    onChange={(event: SyntheticEvent, newValue: number | null) => {
                                        setRating(newValue)
                                    }}
                                    defaultValue={props.isEdit ? props.rating : undefined}
                                    precision={0.5}
                                />
                            </div>

                            <div className="actions">
                                <Button variant="contained" onClick={handleSubmit}>
                                    <Icon>
                                        {
                                            props.isEdit ? 'save' : 'add'
                                        }
                                    </Icon>
                                    {
                                        props.isEdit ? 'Update' : 'Submit'
                                    }
                                </Button>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}

export default AddRecommendation;