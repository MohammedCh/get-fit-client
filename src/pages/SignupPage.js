// TODO autologin on successful sign up
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function SignupPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imgFile, setImgFile] = useState(null);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleImage = (e) => {
    setImage(e.target.value);
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
    // imgUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST ro
    setImgFile(e.target.files[0]);
  };

  //get user type from the URL query params
  const [searchParams, setSearchParams] = useSearchParams();
  const userType = searchParams.get("userType");

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();

    uploadData.append("username", username);
    uploadData.append("password", password);
    uploadData.append("type", userType);

    if (userType === "trainer") {
      uploadData.append("name", name);
      uploadData.append("description", description);
      uploadData.append("imgUrl", imgFile);
    }

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/api/auth/signup`, uploadData)
      .then((response) => {
        setUsername("");
        setPassword("");
        setName("");
        setDescription("");
        setImage("");
        setImagePreview("");
        setImgFile(null);
        navigate(`/login?userType=${userType}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage p-3">
      <main className="form-signin text-white">
        <form onSubmit={handleSignupSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
          <div className="form-floating text-black">
            <input
              type="text"
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

          {userType === "trainer" && (
            <>
              <label
                className="mt-4 bg-dark"
                htmlFor="exampleFormControlInput1"
              >
                <b>
                  Profile info that will be shown to users & potential clients:
                </b>
              </label>

              <div className="form-floating text-black">
                <input
                  type="text"
                  className="form-control"
                  id="floatingName"
                  value={name}
                  onChange={handleName}
                  placeholder="Full name"
                />
                <label htmlFor="floatingName">Full name</label>
              </div>
              <div className="form-floating text-black">
                <textarea
                  style={{ height: "8em" }}
                  className="form-control"
                  id="floatingDescription"
                  value={description}
                  onChange={handleDescription}
                  placeholder="Description"
                />
                <label htmlFor="floatingDescription">Description</label>
              </div>
              <div className="text-black">
                <input
                  type="file"
                  className="form-control form-control-lg"
                  value={image}
                  onChange={handleImage}
                />
                {imagePreview && (
                  <img
                    className="my-2"
                    style={{ width: "15%" }}
                    src={imagePreview}
                    alt="preview"
                  />
                )}
              </div>
            </>
          )}
          <button
            className="btn btn-lg btn-secondary fw-bold border-white mt-4"
            type="submit"
          >
            Sign up
          </button>
        </form>
        <p>
          Already have account?{" "}
          <Link to={`/login?userType=${userType}`}> Login</Link>
        </p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </main>
    </div>
  );
}

export default SignupPage;
