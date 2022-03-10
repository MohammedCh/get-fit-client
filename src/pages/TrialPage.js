import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import conversationsIcon from "../conversations.png";
import profileIcon from "../profile.png";
import homeIcon from "../home.png";
import queriesIcon from "../queries.png";

function TrialPage() {
  return (
    <div>
      <nav className="navbar navbar-expand bg-dark fixed-bottom">
        <ul className="navbar-nav w-100 d-flex justify-content-center">
          <li className="nav-item">
            <Link to={"/"}>
              <img
                className="nav-link bg-white rounded-circle mx-3"
                src={homeIcon}
                alt="home"
                width={"60%"}
              />
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/queries"}>
              <img
                className="nav-link bg-white rounded-circle mx-3"
                src={queriesIcon}
                alt="queries"
                width={"60%"}
              />
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/profile"}>
              <img
                className="nav-link bg-white rounded-circle mx-3"
                src={profileIcon}
                alt="profile"
                width={"60%"}
              />
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/conversations"}>
              <img
                className="nav-link bg-white rounded-circle mx-3"
                src={conversationsIcon}
                alt="conversations"
                width={"60%"}
              />
            </Link>
          </li>
        </ul>
      </nav>
      <h1>trial Page</h1>
    </div>
  );
}

export default TrialPage;
