import { Link, useParams, useLocation } from "react-router-dom";
import TextBubble from "../components/TextBubble";
import axios from "axios";
import React ,{ useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function Conversation() {
  const [conversation, setConversation] = useState([]);
  const { conversationId } = useParams();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const { user } = useContext(AuthContext);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
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

          //scroll to bottom
          scrollToBottom();
        })
        .catch((error) => console.log(error));
    }
  };

  const fieldRef = useRef(null);
  function scrollToBottom() {
    fieldRef.current.focus();
  }
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
      console.log(response.data.trainerId)
      const responseProfile = await axios.get(
        `${API_URL}/api/trainers/profile/${response.data.trainerId}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setConversation(response.data);
      setProfile(responseProfile.data);
      setIsLoading(false);
      scrollToBottom()
    } catch (error) {
      console.log("error :>> ", error.response.data);
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
            <div className="card-header d-flex justify-content-between align-items-center p-3 fixed-top bg-dark">
              <Link to={"/conversations"}>
                <button className="btn btn-lg btn-secondary fw-bold m-2">
                  {"<"}
                </button>
              </Link>
              <Link
                to={`/trainer/profile/${conversation.trainerId}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                className="fw-bold mb-0 col-11 text-white"
              >
                <img
                  src={profile.imgUrl}
                  alt="avatar"
                  className="rounded-circle me-3 shadow-1-strong"
                  width={60}
                />
                <span>
                  {profile.name}
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
            <div className="card-header d-flex justify-content-between align-items-center p-3 fixed-top bg-dark">
              <Link to={"/conversations"}>
                <button className="btn btn-lg btn-secondary fw-bold m-2">
                  {"<"}
                </button>
              </Link>
              <Link
                to={`/queries/${conversation.queryId._id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                className="fw-bold mb-0 col-11 text-white"
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
          <input style={{width:"1px", height:"1px", marginTop:"15%"}} ref={fieldRef} className="bg-dark"/>
        </>
      )}
    </div>
  );
}

export default Conversation;
