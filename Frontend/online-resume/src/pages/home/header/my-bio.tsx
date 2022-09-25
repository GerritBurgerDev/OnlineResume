import myAvatar from "@/assets/images/my-avatar.jpeg";
import {Button, Icon} from "@mui/material";
import {GitHub, LinkedIn} from "@mui/icons-material";
import React from "react";
import "./my-bio.scss";

const MyBio = () => {
    return (
        <div className="my-bio">
            <div className="top-section">
                <div className="image-container">
                    <img src={myAvatar} alt="my-avatar"/>
                </div>

                <div className="content-container">
                    <h1>Who am I?</h1>

                    <p>TLDR; an excellent software engineer and a hard worker.</p>

                    <p>
                        On a serious note, I&apos;m a mid-level software engineer specialising in Go and Typescript (React) and
                        I&apos;m very passionate about development and learning new things.
                    </p>

                    <p>
                        Why do I do this? I get an overwhelming sense of satisfaction from working with a team to build
                        out projects and seeing it flourish. Software development is not only my job but also a hobby which
                        means I get up every morning feeling excited thinking about today&apos;s challenges!
                    </p>
                </div>
            </div>

            <div className="actions-container">
                <Button variant="contained">
                    <Icon>recommend</Icon>
                    Recommend
                </Button>
                <Button variant="contained">
                    <LinkedIn />
                </Button>
                <Button variant="contained">
                    <GitHub />
                </Button>
            </div>
        </div>
    )
}

export default MyBio;