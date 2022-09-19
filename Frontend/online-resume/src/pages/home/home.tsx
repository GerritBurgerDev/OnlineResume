import React from 'react';
import "./home.scss";
import myAvatar from "@/assets/images/my-avatar.jpeg";
import companyLogo from "@/assets/images/company-logo.png";
import IconCard from "@/components/icon-card/icon-card";

const Home = () => {
    return (
        <div className="home-page">
            <div className="top-section">
                <div className="my-bio">
                    <div className="image-container">
                        <img src={myAvatar} alt="my-avatar"/>
                    </div>

                    <div className="content-container">
                        <h1>Who am I?</h1>

                        <p>TLDR; a good software engineer and a hard worker.</p>

                        <p>
                            On a serious note, I'm a mid-level software engineer specialising in Go and Typescript (React) and
                            I'm very passionate about development and learning new things.
                        </p>

                        <p>
                            Why do I do this? I get an overwhelming sense of satisfaction from working with a team to build
                            out projects and seeing it flourish. Software development is not only my job but also a hobby which
                            means I get up every morning feeling excited thinking about today's challenges!
                        </p>
                    </div>
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