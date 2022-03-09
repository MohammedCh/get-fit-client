import { Link, useParams } from "react-router-dom";
import TextBubble from "../components/TextBubble";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function Conversation() {
  const [conversation, setConversation] = useState([]);
  const { conversationId } = useParams();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);

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
        getConversation();
      })
      .catch((error) => console.log(error));
  };
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
      setIsLoading(false);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  // Get the token from the localStorage
  useEffect(() => {
    getConversation();
  }, [conversationId]);

  return (
    <div>
      {!isLoading && (
        <>
          {user.type === "trainee" && (
            <div className="card-header d-flex justify-content-between align-items-center p-3">
              <button className="mr-auto p-2 col-0">Back</button>
              <Link
                to={`/trainer/profile/${conversation.trainerId}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                className="fw-bold mb-0 col-11"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle me-3 shadow-1-strong"
                  width={60}
                />
                <span>
                  Brad Pitt
                  <i
                    style={{
                      fontSize: "0.8em",
                      textDecoration: "underline",
                    }}
                  >
                    view profile
                  </i>
                </span>
              </Link>
            </div>
          )}
          {user.type === "trainer" && (
            <div className="card-header d-flex justify-content-between align-items-center p-3">
              <button className="mr-auto p-2 col-0">Back</button>
              <Link
                to={`/queries/${conversation.queryId._id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                className="fw-bold mb-0 col-11"
              >
                <span>
                  {conversation.queryId.title}{" "}
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
          )}

          <ul className="list-unstyled">
            {conversation.conversations?.map((message) => {
              return <TextBubble key={message._id} message={message} />;
            })}
          </ul>
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
      )}
    </div>
  );
}

export default Conversation;
