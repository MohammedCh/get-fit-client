import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_BACKEND_URL;

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
        findExistingConversationId(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error :>> ", error.response.data.errorMessage);
      }
    };
    getQuery();
  }, [queryId]);
  function findExistingConversationId(query) {
      query.conversations.forEach((conversation) => {
        if (conversation.trainerId === user._id) {
          setTrainerConvId(conversation._id);
        }
      });
  }

  async function deleteQuery() {
    const storedToken = localStorage.getItem("authToken");

    try {
      const response = await axios.delete(
        `${API_URL}/api/queries/${queryId}/delete`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      navigate("/queries");
    } catch (error) {
      console.log("error :>> ", error.response.data.errorMessage);
    }
  }

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
                  <Link
                    to={`/projects/edit/${queryId}`}
                    className="px-2"
                    state={{ query }}
                  >
                    <button className="btn btn-lg btn-secondary fw-bold border-white m-2">
                      Edit Query
                    </button>
                  </Link>

                  <button
                    className="btn btn-lg btn-secondary fw-bold border-white m-2"
                    onClick={() => deleteQuery()}
                  >
                    Delete Query
                  </button>
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
