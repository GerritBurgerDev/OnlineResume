import React, {useState} from 'react';
import "./email-me.scss";
import {Button, Icon} from "@mui/material";
import emailjs from 'emailjs-com';
import {useNotificationStore} from "@/stores/notification-store";
import {useProfileStore} from "@/stores/profile-store";
import CustomInput from "@/components/util/Inputs/CustomInput/custom-input";

const EmailMe = () => {
    const EMAIL_DEBOUNCE_TIME = 300; // 5 Minutes
    const { openNotification } = useNotificationStore((state) => state);
    const { profileData } = useProfileStore((state) => state);

    const [hasClickedSend, setHasClickedSend] = useState<boolean>(false);
    const [emailDetails, setEmailDetails] = useState({
        name: '',
        email: '',
        message: ''
    });

    const setDetails = (key: string, value: string) => {
        setEmailDetails({
            ...emailDetails,
            [key]: value
        });
    }

    const validateEmail = (email: string) => {
        return /[\w-.]+@([\w-]+\.)+[\w-]{2,4}/gi.test(email);
    }

    const sendEmail = () => {
        setHasClickedSend(true);
        const hasEmptyField = Object.values(emailDetails).some(val => !val);

        if (hasEmptyField) {
            return;
        }

        if (!emailDetails.name || !emailDetails.message || !validateEmail(emailDetails.email)) {
            return;
        }

        const sessionTimeStamp = sessionStorage.getItem('email-sent-timestamp')
        let timeElapsed = EMAIL_DEBOUNCE_TIME;

        if (sessionTimeStamp) {
            timeElapsed = Math.floor((Date.now() - parseInt(sessionTimeStamp)) / 1000);
        }

        const minutesToWait = Math.floor((EMAIL_DEBOUNCE_TIME - timeElapsed) / 60);
        const secondsToWait = (60 - (timeElapsed % 60));

        if (timeElapsed < EMAIL_DEBOUNCE_TIME) {
            openNotification({
                color: 'warning',
                content: `You need to wait ${minutesToWait} minutes ${secondsToWait} seconds before sending another email.`
            });
            return;
        }

        emailjs.send('service_ixu1b4l', 'template_hygt3ws', emailDetails, '4503xli4tL-nAwBwj')
            .then(() => {
                sessionStorage.setItem('email-sent-timestamp', `${Date.now()}`);
                openNotification({
                    color: 'success',
                    content: 'The Email was successfully sent!'
                });
            })
            .catch(() => {
                openNotification({
                    color: 'error',
                    content: 'The Email could not be sent. Please try again.'
                });
            });
    }

    return (
        <div className="email-me">
            <h1>Contact Me</h1>

            <CustomInput
                error={hasClickedSend && !emailDetails.name}
                helperText={(hasClickedSend && !emailDetails.name) && 'This field is required'}
                id="standard-textarea"
                label="Full Name"
                placeholder={!profileData ? 'Enter your full name' : ''}
                defaultValue={profileData?.name}
                // variant="standard"
                onChange={(e) => setDetails('name', e.target.value)}
            />
            <CustomInput
                error={hasClickedSend && !validateEmail(emailDetails.email)}
                helperText={(hasClickedSend && !validateEmail(emailDetails.email)) && 'This is not a valid email address.'}
                id="standard-textarea"
                label="Email"
                placeholder={!profileData ? 'Enter your email' : ''}
                defaultValue={profileData?.email}
                onChange={(e) => setDetails('email', e.target.value)}
            />
            <CustomInput
                error={hasClickedSend && !emailDetails.message}
                helperText={(hasClickedSend && !emailDetails.message) && 'Please enter the message you would like to send.'}
                id="standard-multiline-static"
                label="Message"
                multiline
                rows={6}
                onChange={(e) => setDetails('message', e.target.value)}
            />

            <div className="actions">
                <Button variant="contained" onClick={() => sendEmail()}>
                    <Icon>send</Icon>
                    Send
                </Button>
            </div>
        </div>
    );
}

export default EmailMe;