import React from "react";

function RecentCapture({ imageUrl, caption }) {
  return (
    <div className="recent-capture">
      <img src={imageUrl} alt="Recent capture" />
      <p>{caption}</p>
    </div>
  );
}

export default RecentCapture;
