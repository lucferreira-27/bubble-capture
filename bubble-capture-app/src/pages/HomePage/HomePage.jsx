import React from "react";
import "./HomePage.css";

function HomePage() {
    return (
        <div className="homepage-container">
            <div className="homepage-content">
                <h1 className="homepage-title">BubbleCapture</h1>
                <button className="homepage-button">Create a New Capture</button>
                <div className="captures-container">
                    <div className="recent-captures-container">
                        <div className="recent-capture">
                            <img
                                src="https://via.placeholder.com/170x240"
                                alt="Recent capture"
                            />
                            <p>Recent capture 1</p>
                        </div>
                        <div className="recent-capture">
                            <img
                                src="https://via.placeholder.com/170x240"
                                alt="Recent capture"
                            />
                            <p>Recent capture 2</p>
                        </div>
                        <div className="recent-capture">
                            <img
                                src="https://via.placeholder.com/170x240"
                                alt="Recent capture"
                            />
                            <p>Recent capture 3</p>
                        </div>
                    </div>
                    <div className="view-all-button-container">
                        <button className="view-all-button">View All</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
