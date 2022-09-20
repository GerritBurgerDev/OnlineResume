import * as React from 'react';
import "./navbar.scss";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
    return (
        <AppBar position="static" className="navbar">
            <Toolbar>
                <div className="left-elements">
                    <h3>
                        <a href="/">GerritBurgerDev</a>
                    </h3>
                </div>

                <div className="center-elements">
                    <a href="/about-me">About Me</a>
                    <a href="/education">Education</a>
                    <a href="/experience">Experience</a>
                    <a href="/projects">Projects</a>
                    <a href="/contact-me">Contact Me</a>
                </div>

                <div className="right-elements">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <SettingsIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
