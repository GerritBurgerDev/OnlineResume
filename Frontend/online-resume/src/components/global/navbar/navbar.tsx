import * as React from 'react';
import "./navbar.scss";
import {AppBar, Toolbar, IconButton} from '@mui/material';
import { Settings, Email } from '@mui/icons-material';
import MyLogo from "@/assets/images/dachshund-logo.png";
import {useModalStore} from "@/stores/modal-store";

const Navbar = () => {
    const { openModal } = useModalStore((state) => state);

    return (
        <AppBar position="static" className="navbar">
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
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => openModal('EMAIL')}>
                        <Email />
                    </IconButton>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Settings />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
