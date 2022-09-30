import React from 'react';
import "./global-modal-wrapper.scss";
import {useModalStore} from "@/stores/modal-store";
import {Modal, Box} from "@mui/material";
import {Close} from "@mui/icons-material";
import EmailMe from "@/components/modals/email-me/email-me";
import {MODAL_TYPE_ADD_RECOMMENDATION, MODAL_TYPE_EMAIL} from "@/constants/modal-constants";
import AddRecommendation from "@/components/modals/add-recommendation/add-recommendation";

const GlobalModalWrapper = () => {
    const { modalType, closeModal } = useModalStore((state) => state);

    const handleClose = () => {
        closeModal();
    }

    const displayModal = () => {
        switch (modalType) {
            case MODAL_TYPE_EMAIL:
                return <EmailMe />;
            case MODAL_TYPE_ADD_RECOMMENDATION:
                return <AddRecommendation />;
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