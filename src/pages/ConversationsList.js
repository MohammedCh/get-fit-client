import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import ChatCard from "../components/ChatCard";

const API_URL = process.env.REACT_APP_BACKEND_URL;

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
        .then((response) => {console.log(response );setConversations(response.data)})
        .catch((error) => console.log(error));
    };
    getMyConversations();
  }, []);

  return (
    <div className="ConversationListPage text-white">
      <h1>My Conversations</h1>
      {conversations.length <= 0 && (
        <h3 className="pt-5">
          No conversations yet :( <br />
          Create a query and wait for our trainers to respond!
        </h3>
      )}
      <ul className="list-unstyled">
        {conversations?.map((conversation) => {
          return (
            <ChatCard key={conversation._id} conversation={conversation} />
          );
        })}
      </ul>
    </div>
  );
}

export default MyConversationListPage;