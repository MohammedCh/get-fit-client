import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function QueryCard(props) {
  const { user } = useContext(AuthContext);
  const { conversation } = props;
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      // Send the token through the request "Authorization" Headers
      const storedToken = localStorage.getItem("authToken");
      try {
        const trainerId = conversation.trainerId;
        const response = await axios.get(
          `${API_URL}/api/trainers/profile/${trainerId}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        setProfile(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error :>> ", error.response.data.errorMessage);
      }
    };
    getProfile();
  }, [user]);

  return (
    <li>
      {!isLoading && (
        <>
          {user.type === "trainee" && (
            <Link
              to={`/conversations/${conversation._id}`}
              state={{ profile }}
              className="card-header d-flex justify-content-left align-items-center m-1"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "1.3em",
                backgroundColor: "rgba(194,165,135,0.5)",
              }}
            >
              <img
                src={profile.imgUrl}
                alt="avatar"
                className="rounded-circle mx-3 shadow-1-strong"
                width={60}
              />
              <span>{profile.name}</span>
            </Link>
          )}
          {user.type === "trainer" && (
            <Link
              to={`/conversations/${conversation._id}`}
              state={{ profile }}
              className="card-header row m-1"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "1.3em",
                backgroundColor: "rgba(194,165,135,0.5)",
              }}
            >
              <p className="row align-self-start mx-1">
                Query title: {conversation.queryId.title}
              </p>
              {/* <span class="badge bg-danger float-end">1</span> */}
            </Link>
          )}
        </>
      )}
    </li>
  );
}

export default QueryCard;
