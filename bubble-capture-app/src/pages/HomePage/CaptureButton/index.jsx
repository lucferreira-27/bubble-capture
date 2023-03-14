import { Link } from "react-router-dom";

function CaptureButton() {
  return (
    <Link to="/form-capture">
      <button className="homepage-button">Create a New Capture</button>
    </Link>
  );
}

export default CaptureButton;