import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import conversationsIcon from "../conversations.png";
import profileIcon from "../profile.png";
import homeIcon from "../home.png";
import queriesIcon from "../queries.png";
import createQueryIcon from "../createQuery.png";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  //  Update the rendering logic to display different content
  //  depending on the user being logged in or not
  return (
    <nav className="navbar navbar-expand bg-dark fixed-bottom">
      <ul className="navbar-nav w-100 d-flex justify-content-center">
        {!isLoggedIn && (
          <li className="nav-item">
            <Link
              to="/signup"
              className="btn btn-lg btn-secondary fw-bold border-white m-2"
            >
              Sign up
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link to={"/"}>
            <img
              className="nav-link bg-light rounded-circle mx-3"
              src={homeIcon}
              alt="home"
              width={"60%"}
            />
          </Link>
        </li>
        {!isLoggedIn && (
          <li className="nav-item">
            <Link
              to="/login"
              className="btn btn-lg btn-secondary fw-bold border-white m-2"
            >
              Login
            </Link>
          </li>
        )}
        {isLoggedIn &&
          user &&
          (user.type === "trainer" ? (
            <>
              <li className="nav-item">
                <Link to={"/queries"}>
                  <img
                    className="nav-link bg-light rounded-circle mx-3"
                    src={queriesIcon}
                    alt="queries"
                    width={"60%"}
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/trainer/profile/${user._id}`}>
                  <img
                    className="nav-link bg-light rounded-circle mx-3"
                    src={profileIcon}
                    alt="profile"
                    width={"60%"}
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/conversations"}>
                  <img
                    className="nav-link bg-light rounded-circle mx-3"
                    src={conversationsIcon}
                    alt="conversations"
                    width={"60%"}
                  />
                </Link>
              </li>
              <button
                className="btn btn-lg btn-secondary fw-bold border-white mx-4"
                onClick={logOutUser}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to={"/queries/create"}>
                  <img
                    className="nav-link bg-light rounded-circle mx-3"
                    src={createQueryIcon}
                    alt="create query"
                    width={"60%"}
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/queries"}>
                  <img
                    className="nav-link bg-light rounded-circle mx-3"
                    src={queriesIcon}
                    alt="queries"
                    width={"60%"}
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/conversations"}>
                  <img
                    className="nav-link bg-light rounded-circle mx-3"
                    src={conversationsIcon}
                    alt="conversations"
                    width={"60%"}
                  />
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-lg btn-secondary fw-bold border-white mx-4"
                  onClick={logOutUser}
                >
                  Logout
                </button>
              </li>
            </>
          ))}
      </ul>
    </nav>
  );
}

export default Navbar;

// {traineeButtons && (
//   <>
//     <li className="nav-item">
//       <Link
//         to="/login?userType=trainee"
//         className="btn btn-lg btn-secondary fw-bold border-white m-2"
//       >
//         Login
//       </Link>
//     </li>
//     <li className="nav-item">
//       <Link
//         to="/signup?userType=trainee"
//         className="btn btn-lg btn-secondary fw-bold border-white m-2"
//       >
//         Signup
//       </Link>
//     </li>
//   </>
// )}
// {!traineeButtons && (
//   <li className="nav-item">
//     <button
//       className="btn btn-lg btn-secondary fw-bold border-white m-2"
//       onClick={() => {
//         setTraineeButtons(true);
//         setTrainerButtons(false);
//       }}
//     >
//       For trainees
//     </button>
//   </li>
// )}
// {trainerButtons && (
//   <>
//     <li className="nav-item">
//       <Link
//         to="/login?userType=trainer"
//         className="btn btn-lg btn-secondary fw-bold border-white m-2"
//       >
//         Login
//       </Link>
//     </li>
//     <li className="nav-item">
//       <Link
//         to="/signup?userType=trainer"
//         className="btn btn-lg btn-secondary fw-bold border-white m-2"
//       >
//         Signup
//       </Link>
//     </li>
//   </>
// )}
// {!trainerButtons && (
//   <li className="nav-item">
//     <button
//       className="btn btn-lg btn-secondary fw-bold border-white m-2"
//       onClick={() => {
//         setTrainerButtons(true);
//         setTraineeButtons(false);
//       }}
//     >
//       For trainers
//     </button>
//   </li>
// )}
