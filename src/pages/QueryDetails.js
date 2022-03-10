import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function QueryDetails() {
  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trainerConvId, setTrainerConvId] = useState("");

  const navigate = useNavigate();

  const { queryId } = useParams();

  const { user } = useContext(AuthContext);

  // Helper function that makes a GET request to the API
  // and retrieves the query by id
  useEffect(() => {
    const getQuery = async () => {
      // Send the token through the request "Authorization" Headers
      const storedToken = localStorage.getItem("authToken");
      try {
        const response = await axios.get(`${API_URL}/api/queries/${queryId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setQuery(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
    getQuery();
  }, [queryId]);
  useEffect(() => {
    function findExistingConversationId() {
      if (!isLoading) {
        query.conversations.forEach((conversation) => {
          if (conversation.trainerId === user._id) {
            setTrainerConvId(conversation._id);
          }
        });
      }
    }
    findExistingConversationId();
  }, [isLoading]);

  // const handleReplySubmit = (e) => {
  //   e.preventDefault();
  //   const storedToken = localStorage.getItem("authToken");

  //   const requestBody = {
  //     queryId,
  //   };
  //   axios
  //     .post(`${API_URL}/api/conversations/new`, requestBody, {
  //       headers: { Authorization: `Bearer ${storedToken}` },
  //     })
  //     .then((response) => {
  //       console.log(response.data._id);
  //       navigate(`/conversations/${response.data._id}`);
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div className="QueryDetails text-white">
      {!isLoading && (
        <div
          className="container"
          style={{
            backgroundColor: "rgba(194,165,135,0.5)",
            borderRadius: "2em",
          }}
        >
          <div className="justify-content-center py-2 border-bottom">
            <h1>{query.title}</h1>
          </div>
          <div className="row d-flex-inline py-2 border-bottom">
            <span>
              <b>Age: </b>
              {query.age} -- <b> Gender: </b>
              {query.gender} --<b> Goal: </b>
              {query.goal}
            </span>
          </div>
          <div className="row" style={{ textAlign: "left" }}>
            <div>{query.info}</div>
            <div
              className="d-flex justify-content-center py-2"
              style={{ textAlign: "left" }}
            >
              {user.type === "trainer" && (
                <>
                  {trainerConvId ? (
                    <Link to={`/conversations/${trainerConvId}`}>
                      <button className="btn btn-lg btn-secondary fw-bold border-white m-2">
                        Go to chat
                      </button>
                    </Link>
                  ) : (
                    <Link to="/new-conversations" state={{ query }}>
                      <button className="btn btn-lg btn-secondary fw-bold border-white m-2">
                        Reply
                      </button>
                    </Link>
                  )}
                </>
              )}
              {user.type === "trainee" && (
                <>
                  {/* TODO fix these buttons and add functionality */}
                  <Link to={`/projects/edit/${queryId}`} className="px-2">
                    <button className="btn btn-lg btn-secondary fw-bold border-white m-2">
                      Edit Query
                    </button>
                  </Link>
                  <Link to="/" className="px-2">
                    <button className="btn btn-lg btn-secondary fw-bold border-white m-2">
                      Delete Query
                    </button>
                  </Link>
                </>
              )}
            </div>
            <Link to={"/queries"} className="d-flex justify-content-center">
              <button className="btn btn-lg btn-secondary fw-bold border-white m-2">
                Back to queries
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default QueryDetails;
