import React, {ChangeEvent, useEffect, useState} from "react";
import "./add-recommendation.scss";
import {Button, Icon, SelectChangeEvent} from "@mui/material";
import CustomSelect from "@/components/util/Inputs/CustomSelect/custom-select";
import {ISelectItem} from "@/interfaces/global-interfaces";
import CustomInput from "@/components/util/Inputs/CustomInput/custom-input";
import {useProjectsStore} from "@/stores/project-store";
import {IProject} from "@/interfaces/project-interfaces";
import _ from "lodash";
import {useProfileStore} from "@/stores/profile-store";

const AddRecommendation = () => {
    const { profileData } = useProfileStore((state) => state);
    const { projects, getAllProjects } = useProjectsStore((state) => state);
    const [projectItems, setProjectitems] = useState<ISelectItem[]>([]);

    const [modalLoading, setModalLoading] = useState(false);

    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    const [position, setPosition] = useState<string>('');
    const [recommendation, setRecommendation] = useState<string>('');
    const [yourName, setYourName] = useState<string | null>('');
    const [relationship, setRelationship] = useState<string>('');

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

        setModalLoading(false);
    }, []);

    const [hasClickedSubmit, setHasClickedSubmit] = useState(false);

    const handleSubmit = () => {
        setHasClickedSubmit(true);

        if (selectedProjects.length === 0 || !position || !yourName || !relationship || !recommendation) {
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

                            <CustomSelect
                                error={hasClickedSubmit && selectedProjects.length === 0}
                                helperText={(hasClickedSubmit && selectedProjects.length === 0) && 'Please select the projects for the recommendation.'}
                                style={{ width: '300px' }}
                                label="Select Project"
                                items={projectItems}
                                multiple
                                value={selectedProjects}
                                onSelectChange={handleProjectChange}
                            />
                            <CustomInput
                                error={hasClickedSubmit && !yourName}
                                helperText={(hasClickedSubmit && !yourName) && 'Please specify your name.'}
                                style={{ width: '300px' }}
                                id="your-name"
                                label="Your Name"
                                variant="outlined"
                                defaultValue={profileData?.name}
                                onChange={handleYourNameChange}
                            />
                            <CustomInput
                                error={hasClickedSubmit && !position}
                                helperText={(hasClickedSubmit && !position) && 'Please specify my position at the time.'}
                                style={{ width: '300px' }}
                                id="my-position"
                                label="My Position"
                                variant="outlined"
                                onChange={handlePositionChange}
                            />
                            <CustomInput
                                error={hasClickedSubmit && !relationship}
                                helperText={(hasClickedSubmit && !relationship) && 'Please specify your position at the time.'}
                                style={{ width: '300px' }}
                                id="your-position"
                                label="Your Position"
                                variant="outlined"
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
                                onChange={handleRecommendationChange}
                            />

                            <div className="actions">
                                <Button variant="contained" onClick={handleSubmit}>
                                    <Icon>add</Icon>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}

export default AddRecommendation;