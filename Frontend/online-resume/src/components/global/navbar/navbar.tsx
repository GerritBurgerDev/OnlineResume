import * as React from 'react';
import "./navbar.scss";
import {AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Fade} from '@mui/material';
import { Settings, Email, LockOutlined } from '@mui/icons-material';
import MyLogo from "@/assets/images/dachshund-logo.png";
import {useModalStore} from "@/stores/modal-store";
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
    GoogleLogout
} from "react-google-login";
import {GOOGLE_CLIENT_ID} from "@/constants/global-constants";
import {useProfileStore} from "@/stores/profile-store";
import {IProfile} from "@/interfaces/global-interfaces";
import {grey, red, orange, blue, green} from "@mui/material/colors";
import {useNotificationStore} from "@/stores/notification-store";
import {MODAL_TYPE_EMAIL} from "@/constants/modal-constants";
import {useEffect, useState} from "react";

const Navbar = () => {
    const { openModal } = useModalStore((state) => state);
    const { openNotification } = useNotificationStore((state) => state);
    const { profileData, setProfileData } = useProfileStore((state) => state);

    const [distanceFromTop, setDistanceFromTop] = useState<number | undefined>(0);

    const onScroll = () => {
        setDistanceFromTop(window.top?.scrollY);
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
    }, [])

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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

    const onLoginFailure = async (err: unknown) => {
        await setProfileData(null);
        console.log('failed:', err);
    };

    const onLogout = async () => {
        await setProfileData(null);
        openNotification({
            color: 'info',
            content: 'You have been logged out.'
        });
    }

    return (
        <AppBar
            position="sticky"
            className="navbar"
            sx={{
                backgroundColor: distanceFromTop && distanceFromTop > 0 ? grey[900] : 'transparent',
                boxShadow: distanceFromTop && distanceFromTop > 0 ? '' : 'none'
            }}
        >
            <Toolbar>
                <div className="left-elements">
                    <h3>
                        <img src={MyLogo} alt="my-logo" />
                        <a href="/">GerritBurgerDev</a>
                    </h3>
                </div>

                <div className="center-elements">
                    <a href="/education">Education</a>
                    <a href="/projects">Experience</a>
                    <a href="/recommendations">Recommendations</a>
                    <a href="/about-me">About</a>
                </div>

                <div className="right-elements">
                    <div className="login-container">
                        { profileData
                            ? <GoogleLogout
                                className="logout-button"
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
                                        <LockOutlined />
                                        <div style={{ paddingLeft: '10px' }}>
                                            Logout
                                        </div>
                                    </Button>
                                )}
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onLogoutSuccess={onLogout}
                            />
                            : <GoogleLogin
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
                                            src={'/svgs/icons/google.svg'}
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
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onSuccess={onLoginSuccess}
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onFailure={onLoginFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                                redirectUri="https://env-prod.d1avb0a17o43q.amplifyapp.com/"
                            />}
                    </div>

                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => openModal(MODAL_TYPE_EMAIL)}>
                        <Email />
                    </IconButton>

                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 0 }} onClick={handleClick}>
                        <Settings />
                    </IconButton>

                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                        style={{
                            top: '9px',
                        }}
                        PaperProps={{
                            style: {
                                minWidth: '200px',
                                position: 'absolute',
                                right: '0',
                                borderRadius: '0px'
                            }
                        }}
                    >
                        <MenuItem onClick={handleClose} style={{ minHeight: '50px' }}>My Recommendations</MenuItem>
                        <MenuItem onClick={handleClose} style={{ minHeight: '50px' }}>My account</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
