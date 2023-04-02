import React from "react";
import Header from "./Header";
import RecentCapturesContainer from "./RecentCapturesContainer";
import CaptureButton from "./CaptureButton";
import ViewAllButton from "./ViewAllButton";
import "./index.css"

function HomePage() {
  const recentCaptures = [
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/170x240",
      caption: "Recent capture 1",
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/170x240",
      caption: "Recent capture 2",
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/170x240",
      caption: "Recent capture 3",
    },
  ];

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <Header />
        <CaptureButton />
        <RecentCapturesContainer captures={recentCaptures} />
        <ViewAllButton />
      </div>
    </div>
  );
}

export default HomePage;
