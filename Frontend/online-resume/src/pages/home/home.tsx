import React from 'react';
import "./home.scss";
import companyLogo from "../../assets/images/company-logo.png";
import IconCard from "@/components/icon-card/icon-card";

const Home = () => {
    return (
        <div className="home-page">
            <div className="top-section">
                <div className="my-bio">
                    <h1>This is the home page</h1>
                </div>

                <div className="current-employment-container">
                    <div className="current-employment">
                        <div className="title-section">
                            <div className="left-section">
                                <h2>Current Employment</h2>
                                <div className="position">
                                    <h3>Position:</h3>
                                    <span className="position-text">Mid-level Fullstack engineer</span>
                                </div>
                            </div>

                            <div className="right-section">
                                <img src={companyLogo} alt="company-logo"/>
                            </div>
                        </div>

                        <div className="stack-section">
                            <h2>Technologies</h2>

                            <div className="technologies-container">
                                <IconCard icon="go" isCustom size={45}/>
                                <IconCard icon="react" isCustom size={45}/>
                                <IconCard icon="aws" isCustom size={45}/>
                                <IconCard icon="mongodb" isCustom size={45}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;