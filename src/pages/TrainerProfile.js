import { useState, useEffect } from "react";

function TrainerProfile() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {!isLoading && (
        <div className="container">
          <h1>Trainer Profile</h1>
          <div className="row">
            <div className="col">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                width="30%"
              />
            </div>
            <div className="col"></div>
          </div>
          <div className="row"></div>
        </div>
      )}
    </div>
  );
}

export default TrainerProfile;
