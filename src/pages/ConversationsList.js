import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function MyConversationListPage() {
  const [conversations, setConversations] = useState([]);
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
      {conversations.map((conversation) => {
        return (
          <div className="ConversationCard card" key={conversation._id}>
            <Link to={`/conversations/${conversation._id}`}>
              <h3>{conversation._id}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default MyConversationListPage;
