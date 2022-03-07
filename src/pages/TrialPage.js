import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function TrialPage() {
  return (
    <div>
      <h1>trial Page</h1>
      <div className="card-header d-flex justify-content-between align-items-center p-3">
        <button className="mr-auto p-2 col-0">Back</button>
        <Link to="hi" className="fw-bold mb-0 col-11">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
            alt="avatar"
            className="rounded-circle me-3 shadow-1-strong"
            width={60}
          />
          <span>Brad Pitt - <i>view profile</i></span>
        </Link>
      </div>
      <ul className="list-unstyled">
        <li className="d-flex mb-4">
          <div className="card" style={{ width: "75%" }}>
            <div className="card-body">
              <p className="mb-0 p-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-muted small mb-0 p-1">
                <i className="far fa-clock" /> 13 mins ago
              </p>
            </div>
          </div>
        </li>
        <li className="d-flex justify-content-end mb-4">
          <div className="card" style={{ width: "75%" }}>
            <div className="card-body d-flex flex-column p-3">
              <p className="mb-0 p-1">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium.
              </p>
              <p className="text-muted small mb-0 p-1">
                <i className="far fa-clock" /> 13 mins ago
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default TrialPage;
