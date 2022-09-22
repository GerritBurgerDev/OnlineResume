import * as React from 'react';
import "./navbar.scss";
import {AppBar, Toolbar, IconButton} from '@mui/material';
import { Settings, Email } from '@mui/icons-material';
import MyLogo from "@/assets/images/dachshund-logo.png";

const Navbar = () => {
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
                    <a href="/projects">Recommendations</a>
                    <a href="/projects">About</a>
                </div>

                <div className="right-elements">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
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
