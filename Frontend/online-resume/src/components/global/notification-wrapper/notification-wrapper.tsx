import React, {Fragment} from 'react';
import {Snackbar, Alert} from "@mui/material";
import Slide, { SlideProps } from '@mui/material/Slide';
import {useNotificationStore} from "@/stores/notification-store";

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionDown(props: TransitionProps) {
    return <Slide {...props} direction="down"/>;
}

const NotificationWrapper = () => {
    const { closeNotification, notification } = useNotificationStore((state) => state);

    // const handleOpen = (Transition: React.ComponentType<TransitionProps>) => () => {
    //     setTransition(() => Transition);
    // };

    const handleClose = () => {
        closeNotification();
    }

    return (
        <div className="notifications-wrapper">
            <Snackbar
                anchorOrigin={notification?.position}
                open={notification?.isOpen}
                onClose={handleClose}
                TransitionComponent={TransitionDown}
                autoHideDuration={notification?.timeout}
                key={TransitionDown.name}
            >
                <Alert onClose={handleClose} severity={notification?.color} sx={{ width: '100%' }}>
                    {
                        notification?.content
                    }
                </Alert>
            </Snackbar>
        </div>
    )
}

export default NotificationWrapper;