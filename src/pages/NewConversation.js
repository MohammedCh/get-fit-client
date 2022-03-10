import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const API_URL = process.env.REACT_APP_BACKEND_URL;

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
      <div className="card-header d-flex justify-content-between align-items-center p-3 fixed-top bg-dark">
        <Link to={`/queries/${query._id}`}>
          <button className="btn btn-lg btn-secondary fw-bold m-2">
            {"<"}
          </button>
        </Link>{" "}
        <Link
          to={`/queries/${query._id}`}
          style={{
            textDecoration: "none",
            color: "black",
          }}
          className="fw-bold mb-0 col-11 text-white"
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
      <form onSubmit={handleSubmit} className="fixed-bottom">
            <div className="input-group">
              <input
                style={{ minHeight: "4em" }}
                type="text"
                className="form-control"
                placeholder="Type new message..."
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  style={{ minHeight: "4em" }}
                  className="btn btn-lg btn-secondary fw-bold"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
    </>
  );
}

export default NewConversation;
