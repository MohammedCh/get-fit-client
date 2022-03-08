import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  //  Update the rendering logic to display different content
  //  depending on the user being logged in or not
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/trial">
        <button>Trial page</button>
      </Link>
      {isLoggedIn && user &&
        (user.type === "trainer" ? (
          <>
            <Link to="/queries">
              <button>Queries</button>
            </Link>
            <Link to="/trainer/profile">
              <button>My Profile</button>
            </Link>
            <Link to="/conversations/">
              <button>My conversations</button>
            </Link>
            <button onClick={logOutUser}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/queries/create">
              <button>Create Query</button>
            </Link>
            <Link to="/queries">
              <button>My Queries</button>
            </Link>
            <Link to="/conversations">
              <button>My conversations</button>
            </Link>
            <button onClick={logOutUser}>Logout</button>
          </>
        ))}
      {!isLoggedIn && (
        <>
          <Link to="/signup?userType=trainee">
            <button>Sign Up trainee</button>
          </Link>
          <Link to="/signup?userType=trainer">
            <button>Sign Up trainer</button>
          </Link>
          <Link to="/login?userType=trainee">
            <button>Login trainee</button>
          </Link>
          <Link to="/login?userType=trainer">
            <button>Login trainer</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
