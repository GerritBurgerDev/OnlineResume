import React from 'react';
import "./global-modal-wrapper.scss";
import {useModalStore} from "@/stores/modal-store";
import {Modal, Box} from "@mui/material";
import {Close} from "@mui/icons-material";
import EmailMe from "@/components/modals/email-me/email-me";
import {MODAL_TYPE_ADD_RECOMMENDATION, MODAL_TYPE_EMAIL} from "@/constants/modal-constants";
import AddRecommendation from "@/components/modals/add-recommendation/add-recommendation";
import {useProfileStore} from "@/stores/profile-store";
import SignInRequired from "@/components/modals/sign-in-required/sign-in-required";

const GlobalModalWrapper = () => {
    const { profileData } = useProfileStore((state) => state);
    const { modalType, modalData, closeModal } = useModalStore((state) => state);

    const handleClose = () => {
        closeModal();
    }

    const displayModal = () => {
        let data;

        switch (modalType) {
            case MODAL_TYPE_EMAIL:
                return <EmailMe />;
            case MODAL_TYPE_ADD_RECOMMENDATION:
                if (!profileData) {
                    return <SignInRequired />;
                }

                data = modalData || {};

                return <AddRecommendation {...data} isEdit={!!modalData} />;
        }
    }

    return (
        <Modal
            open={modalType !== ''}
            onClose={handleClose}
            aria-labelledby="Global Modal Wrapper"
            aria-describedby="This modal wrapper displays all modals globally"
        >
            <Box className="modal-content-container">
                <Close className="modal-close-button" onClick={handleClose} />
                {
                    displayModal()
                }
            </Box>
        </Modal>
    )
}

export default GlobalModalWrapper;