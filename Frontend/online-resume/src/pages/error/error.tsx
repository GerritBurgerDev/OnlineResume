import React from 'react';
import "./error.scss";
import MyLogo from "@/assets/images/dachshund-logo.png";

const Error = () => {
    return (
        <div className="error-page">
            <img src={MyLogo} alt="my-logo"/>
            <h1 className="not-found">
                <div className="bounce--twice">4</div>0<div className="bounce--twice">4</div> Not Found
            </h1>
            <h1 className="sniff">
                Oops!
                <div className="shake--2s">*Sniff Sniff*</div>
            </h1>
            <p className="reason">
                Hmmmmm. I can&apos;t seem to find the page you are looking for.
                This means I am most probably still building this page.
            </p>
        </div>
    )
}

export default Error;
