import { useState, useEffect } from "react";
import axios from "axios";
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function TrainerProfile(props) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const params = useParams();

  // Helper function that makes a GET request to the API
  // and retrieves the query by id
  useEffect(() => {
    const getProfile = async () => {
      // Send the token through the request "Authorization" Headers
      const storedToken = localStorage.getItem("authToken");
      try {
        if (user) {
          const trainerId =
            user.type === "trainer" ? user._id : params.trainerId;
          const response = await axios.get(
            `${API_URL}/api/trainers/profile/${trainerId}`,
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );
          setProfile(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
    getProfile();
  }, [user]);
  return (
    <div>
      {!isLoading && (
        <div className="container">
          <h1 className="text-white">{user.type==="trainer"?"My":`${profile.name}'s`} profile</h1>
          <div className="row align-items-md-stretch py-1">
            <div className="col-md-3">
              <div className="h-100 p-1 rounded-3">
                <img src={profile.imgUrl} alt="avatar" width="100%" />
              </div>
            </div>
            <div className="col-md-9 text-white" style={{ textAlign: "left" }}>
              <div
                className="h-100 p-4 rounded-3"
                style={{
                  backgroundColor: "rgba(194,165,135,0.5)",
                }}
              >
                <h2>{profile.name}</h2>
                <p>{profile.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainerProfile;
