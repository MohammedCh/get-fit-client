import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function EditQueryPage(props) {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");

  const { queryId } = useParams();
  const navigate = useNavigate();

  // This effect will run after the initial render and each time
  // the project id coming from URL parameter `projectId` changes

  useEffect(() => {
    axios
      .get(`${API_URL}/api/queries/${queryId}`)
      .then((response) => {
        /*
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and info of the query
        */
        const oneQuery = response.data;
        setTitle(oneQuery.title);
        setInfo(oneQuery.info);
      })
      .catch((error) => console.log(error));
  }, [queryId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, info };

    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/api/queries/${queryId}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate("/queries/" + queryId);
      });
  };
  return (
    <div className="EditQueryPage">
      <h3>Edit the Query</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Other information::</label>
        <textarea
          name="info"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default EditQueryPage;
