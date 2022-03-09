import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://get-fitapp.herokuapp.com";
function QueryCreate(props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [info, setInfo] = useState("");

  const { user } = useContext(AuthContext);

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
    <div className="AddQuery">
      <h3>Add Query</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <label>Goal:</label>
        <input
          type="text"
          name="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <label>Other information:</label>
        <textarea
          type="text"
          name="info"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default QueryCreate;
