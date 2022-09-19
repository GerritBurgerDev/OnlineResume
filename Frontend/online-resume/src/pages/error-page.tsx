import React from 'react';
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    // eslint-disable-next-line
    const error: any = useRouteError();

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>

                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}

export default ErrorPage;
