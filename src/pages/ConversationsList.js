import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function MyConversationListPage() {
  const [conversations, setConversations] = useState([]);

  const { user } = useContext(AuthContext);

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    const getMyConversations = () => {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");
      // Send the token through the request "Authorization" Headers
      axios
        .get(`${API_URL}/api/conversations`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => setConversations(response.data))
        .catch((error) => console.log(error));
    };
    getMyConversations();
  }, []);

  return (
    <div className="ConversationListPage">
      <h1>Conversations:</h1>
      <ul className="list-unstyled">
        {conversations.map((conversation) => {
          return (
            <li key={conversation._id}>
              {user.type === "trainee" && (
                <Link
                  to={`/conversations/${conversation._id}`}
                  className="card-header d-flex justify-content-left align-items-center mx-1"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "1.3em",
                  }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    className="rounded-circle mx-3 shadow-1-strong"
                    width={60}
                  />
                  <span>Brad Pitt</span>
                </Link>
              )}
              {user.type === "trainer" && (
                <Link
                  to={`/conversations/${conversation._id}`}
                  className="card-header row mx-1"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "1.3em",
                  }}
                >
                  <p className="row align-self-start mx-1">
                    {conversation.queryId.title}
                  </p>
                  {/* <span class="badge bg-danger float-end">1</span> */}
                  <p className="row align-self-start mx-1"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "0.8em",
                    }}
                  >
                    {conversation.queryId.info.substring(0, 20)}
                  </p>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MyConversationListPage;
