import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import QueryCard from "../components/QueryCard";

const API_URL = "http://localhost:5005";

function QueryListPage() {
  const [queries, setQueries] = useState([]);

  const getAllQueries = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);
    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/queries`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setQueries(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllQueries();
  }, []);

  return (
    <div className="QueryListPage">
      <h1>Queries:</h1>
      <ul className="list-unstyled">
        {queries?.map((query) => {
          return <QueryCard key={query._id} query={query} />;
        })}
      </ul>
    </div>
  );
}

export default QueryListPage;
