import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function QueryDetails() {
  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
    <div className="QueryDetails">
      {!isLoading && (
        <div className="container">
          <h1>{query.title}</h1>
          <div className="row" style={{ textAlign: "left" }}>
            <div className="col-sm-3 py-2">
              <div className="row">
                <div className="col-5 order-1" style={{ textAlign: "right" }}>
                  <b>Age:</b>
                </div>
                <div className="col-5 order-4" style={{ textAlign: "right" }}>
                  <b>Gender:</b>
                </div>
                <div className="col-5 order-7" style={{ textAlign: "right" }}>
                  <b>Goal:</b>
                </div>
                <div className="col-5 order-2" style={{ textAlign: "left" }}>
                  {query.age}
                </div>
                <div className="col-5 order-5" style={{ textAlign: "left" }}>
                  {query.gender}
                </div>
                <div className="col-5 order-8" style={{ textAlign: "left" }}>
                  {query.goal}
                </div>
              </div>
              {user.type === "trainer" && (
                <div
                  className="d-flex justify-content-center py-1"
                  style={{ textAlign: "left" }}
                >
                  {/* <form onSubmit={handleReplySubmit}>
                    <button type="submit">Reply</button>
                  </form> */}
                  <Link to="/new-conversations" state={{ query }}>
                    <button>Reply</button>
                  </Link>
                </div>
              )}
              {user.type === "trainee" && (
                <div>
                  <div
                    className="d-flex justify-content-center py-1"
                    style={{ textAlign: "left" }}
                  >
                    <Link to="/">
                      <button>Delete Query</button>
                    </Link>
                  </div>
                  <div
                    className="d-flex justify-content-center py-1"
                    style={{ textAlign: "left" }}
                  >
                    <Link to={`/projects/edit/${queryId}`}>
                      <button>Edit Query</button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="col">{query.info}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QueryDetails;
