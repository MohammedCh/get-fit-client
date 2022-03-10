import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <header className="mb-auto p-4">
        <div>
          <h1 className="mb-0 text-white">Get fit!</h1>
        </div>
      </header>
      <div className="content justify-content-center px-5 pt-1">
        <div
          className="px-1 py-3 text-white text-center"
          style={{
            backgroundColor: "rgba(116,106,117,0.4)",
            borderRadius: "2em",
          }}
        >
          <p className="lead px-5">
            <i>
              “No citizen has a right to be an amateur in the matter of physical
              training…what a disgrace it is for a man to grow old without ever
              seeing the beauty and strength of which his body is capable.”
            </i>
            <br />
            <b>-Socrates</b>
          </p>
        </div>
        <div className="pt-3">
          <Link
            to="/signup?userType=trainee"
            className="btn btn-lg btn-secondary fw-bold border-white m-2"
          >
            I wanna train!
          </Link>
          <Link
            to="/signup?userType=trainer"
            className="btn btn-lg btn-secondary fw-bold border-white m-2"
          >
            Become a trainer!
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
