import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  //get user type from the URL query params
  const [searchParams, setSearchParams] = useSearchParams();
  const userType = searchParams.get("userType");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password, userType };

    axios
      .post(`${API_URL}/api/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data
        storeToken(response.data);
        authenticateUser();
        navigate(`/`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
        console.log(error.response.data);
      });
  };
  return (
    <div className="LoginPage p-3">
      {!userType && (
        <ul className="list-unstyled pt-5">
          <li className="nav-item">
            <Link
              to="/login?userType=trainee"
              className="btn btn-lg btn-secondary fw-bold border-white m-2"
            >
              Trainee
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/login?userType=trainer"
              className="btn btn-lg btn-secondary fw-bold border-white m-2"
            >
              Trainer
            </Link>
          </li>
        </ul>
      )}
      {userType && (
        <main className="form-signin text-white">
          <form onSubmit={handleLoginSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating text-black">
              <input
                type="username"
                className="form-control"
                id="floatingUsername"
                value={username}
                onChange={handleUsername}
                placeholder="Username"
              />
              <label htmlFor="floatingUsername">Username</label>
            </div>
            <div className="form-floating text-black">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                value={password}
                onChange={handlePassword}
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button
              className="btn btn-lg btn-secondary fw-bold border-white m-2"
              type="submit"
            >
              Sign in
            </button>
          </form>
          {errorMessage && (
            <p className="error-message text-danger fw-bold">{errorMessage}</p>
          )}
          <p>
            Don't have an account yet?{" "}
            <Link to={`/signup?userType=${userType}`}> Sign Up</Link>
          </p>
        </main>
      )}
    </div>
  );
}

export default LoginPage;
