import * as React from "react";
import "./sign-in-required.scss";
import {GOOGLE_CLIENT_ID} from "@/constants/global-constants";
import {Button} from "@mui/material";
import {blue, green, grey, orange, red} from "@mui/material/colors";
import {GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import {IProfile} from "@/interfaces/global-interfaces";
import {useProfileStore} from "@/stores/profile-store";
import {useNotificationStore} from "@/stores/notification-store";

const SignInRequired = () => {
    const { profileData, setProfileData } = useProfileStore((state) => state);
    const { openNotification } = useNotificationStore((state) => state);

    const onLoginSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if (!profileData) {
            if ("profileObj" in res) {
                await setProfileData({
                    ...res.profileObj,
                    accessToken: res.accessToken
                } as IProfile);
                openNotification({
                    color: 'success',
                    content: 'Successfully Logged In!'
                });
            }
        }
    };

    const onLoginFailure = async () => {
        await setProfileData(null);
        openNotification({
            color: 'error',
            content: 'Could not sign in. Please try again.'
        });
    };

    return (
        <div className="sign-in-required-modal fade-in--1s">
            <h1>Please Sign In</h1>

            <p>
              This functionality is only available to logged in users. Logging in only gives me access to you <b>basic
                information</b> that <b>you</b>  made public, like your email and full name.
            </p>

            <GoogleLogin
                className="login-button"
                clientId={GOOGLE_CLIENT_ID}
                render={(renderedProps) => (
                    <Button
                        onClick={renderedProps.onClick}
                        sx={{
                            color: grey[100],
                            textTransform: 'none',
                            width: '100%',
                            justifyContent: 'flex-start',
                            border: `1px solid ${grey[100]}`,
                            backgroundColor: `rgba(0, 0, 0, 0.1)`
                        }}
                    >
                        <img
                            src={'/svgs/google.svg'}
                            alt="sign-in-icon"
                            style={{ width: '18px', height: '18px' }}
                        />
                        <div style={{ paddingLeft: '10px' }}>
                            Login with
                            <span style={{ marginLeft: '5px', color: red[400] }}>G</span>
                            <span style={{ color: orange[400] }}>oo</span>
                            <span style={{ color: green[400] }}>gl</span>
                            <span style={{ color: blue[400] }}>e</span>
                        </div>
                    </Button>
                )}
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default SignInRequired;