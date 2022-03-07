import { Link, useParams } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5005";

function Conversation() {
  const [conversation, setConversation] = useState([]);
  const { conversationId } = useParams();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const requestBody = {
      queryId: conversation.queryId,
      message,
    };
    axios
      .post(`${API_URL}/api/conversations/${conversationId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setMessage("");
      })
      .catch((error) => console.log(error));
  };

  // Get the token from the localStorage
  useEffect(() => {
    const getConversation = async () => {
      // Send the token through the request "Authorization" Headers
      const storedToken = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          `${API_URL}/api/conversations/${conversationId}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        setConversation(response.data);
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
    getConversation();
  }, [conversationId]);

  return (
    <div>
      <h1>Conversation</h1>

      <Link to={`/trainer/profile/${conversation.trainerId}`}>
        <button>Trainer Profile</button>
      </Link>
      {conversation.conversations?.map((message) => {
        return <div key={message._id}>{message.message}</div>;
      })}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Conversation;
