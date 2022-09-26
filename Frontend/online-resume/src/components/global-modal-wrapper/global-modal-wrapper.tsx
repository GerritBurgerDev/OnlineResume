import React from 'react';
import "./global-modal-wrapper.scss";
import {useModalStore} from "@/stores/modal-store";
import {Modal, Box} from "@mui/material";
import {Close} from "@mui/icons-material";
import EmailMe from "@/components/email-me/email-me";

const GlobalModalWrapper = () => {
    const { modalType, closeModal } = useModalStore((state) => state);

    const handleClose = () => {
        closeModal();
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
                    modalType === 'EMAIL' && <EmailMe />
                }
            </Box>
        </Modal>
    )
}

export default GlobalModalWrapper;