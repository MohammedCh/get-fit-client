import { Link, useParams } from "react-router-dom";
import TextBubble from "../components/TextBubble";
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
  }, [conversationId, conversation]);

  return (
    <div>
      <div className="card-header d-flex justify-content-between align-items-center p-3">
        <button className="mr-auto p-2 col-0">Back</button>
        <Link to={`/trainer/profile/${conversation.trainerId}`} className="fw-bold mb-0 col-11">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
            alt="avatar"
            className="rounded-circle me-3 shadow-1-strong"
            width={60}
          />
          <span>
            Brad Pitt - <i>view profile</i>
          </span>
        </Link>
      </div>

      {conversation.conversations?.map((message) => {
        return <TextBubble key={message._id} message={message} />;
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
