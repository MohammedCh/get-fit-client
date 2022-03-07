import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function QueryDetails() {
  const [query, setQuery] = useState(null);

  const { queryId } = useParams();


  // Helper function that makes a GET request to the API
  // and retrieves the query by id
  useEffect(() => {
    const getQuery = async () => {
      // Send the token through the request "Authorization" Headers
      const storedToken = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          `${API_URL}/api/queries/${queryId}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        setQuery(response.data);
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
    getQuery();
  }, [queryId]);

  return (
    <div className="QueryDetails">
      {query && (
        <>
          <h1>{query.title}</h1>
          <p>{query.info}</p>
        </>
      )}

      <Link to="/queries">
        <button>Back to queries</button>
      </Link>

      <Link to={`/projects/edit/${queryId}`}>
        <button>Edit Query</button>
      </Link>
    </div>
  );
}

export default QueryDetails;
