import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Header from "./components/Header";

const Main = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/"  element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default Main;

if (document.getElementById('header')) {
    ReactDOM.render(<Header />, document.getElementById('header'));
}

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
