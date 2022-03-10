import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function QueryCreate(props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [info, setInfo] = useState("");

  const { user } = useContext(AuthContext);
  const handleTitle = (e) => setTitle(e.target.value);
  const handleAge = (e) => setAge(e.target.value);
  const handleGender = (e) => setGender(e.target.value);
  const handleGoal = (e) => setGoal(e.target.value);
  const handleInfo = (e) => setInfo(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const requestBody = {
      title,
      age,
      gender,
      goal,
      info,
    };
    axios
      .post(`${API_URL}/api/queries/create`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setTitle("");
        setAge(0);
        setGender("");
        setGoal("");
        setInfo("");
        navigate(`/queries/${response.data.createdQueryId}`);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="AddQuery text-white mx-3">
      <h3>Add Query</h3>
      <p>
        In this page you can create a query that will be seen by our trainers.
        The trainers who have relevant experience and interest will reply to you
        with offers that you can choose to reply to. <br />
        Find your personal trainer and make the impossible possible!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-floating text-black">
          <input
            type="text"
            className="form-control"
            id="floatingTitle"
            value={title}
            onChange={handleTitle}
            placeholder="Query title"
          />
          <label htmlFor="floatingTitle">Query title</label>
        </div>
        <div className="form-floating text-black">
          <input
            type="number"
            className="form-control"
            id="floatingAge"
            value={age}
            onChange={handleAge}
            placeholder="Age"
          />
          <label htmlFor="floatingAge">Age</label>
        </div>
        <div className="input-group form-floating text-black">
          <select
            className="custom-select form-control"
            id="floatingGender"
            onChange={handleGender}
          >
            <option selected>{gender}</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">other</option>
          </select>
          <label htmlFor="floatingGender">Gender</label>
        </div>
        <div className="form-floating text-black">
          <input
            type="text"
            className="form-control"
            id="floatingGoal"
            value={goal}
            onChange={handleGoal}
            placeholder="Goal"
          />
          <label htmlFor="floatingGoal">Goal</label>
        </div>
        <div className="form-floating text-black">
          <textarea
            style={{ height: "8em" }}
            type="text"
            className="form-control"
            id="floatingInfo"
            value={info}
            onChange={handleInfo}
            placeholder="Description & additional information"
          />
          <label htmlFor="floatingInfo">
            Description & additional information
          </label>{" "}
        </div>
        <button
          className="btn btn-lg btn-secondary fw-bold border-white mt-4"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default QueryCreate;
