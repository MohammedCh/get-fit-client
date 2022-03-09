import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const API_URL = "https://get-fitapp.herokuapp.com";

function NewConversation(props) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const { query } = location.state;

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const requestBody = {
      queryId: query._id,
      message,
    };
    axios
      .post(`${API_URL}/api/conversations/new`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/conversations/${response.data._id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="card-header d-flex justify-content-between align-items-center p-3">
        <button className="mr-auto p-2 col-0">Back</button>
        <Link
          to={`/queries/${query._id}`}
          style={{
            textDecoration: "none",
            color: "black",
          }}
          className="fw-bold mb-0 col-11"
        >
          <span>
            {query.title}{" "}
            <i
              style={{
                fontSize: "0.8em",
                textDecoration: "underline",
              }}
            >
              view query
            </i>
          </span>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default NewConversation;
