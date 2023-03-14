import React from "react";
import RecentCapture from "./RecentCapture";

function RecentCapturesContainer({ captures }) {
  return (
    <div className="recent-captures-container">
      {captures.map((capture) => (
        <RecentCapture
          key={capture.id}
          imageUrl={capture.imageUrl}
          caption={capture.caption}
        />
      ))}
    </div>
  );
}

export default RecentCapturesContainer;
