import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function QueryCard(props) {
  const { user } = useContext(AuthContext);

  const colorPalette = [
    "rgba(241,87,25,0.5)",
    "rgba(194,165,135,0.5)",
    "rgba(133,147,86,0.5)",
    "rgba(116,106,117,0.5)",
    "rgba(235,196,65,0.5)",
  ];
  const colorPalette2 = [
    "rgba(14, 13, 19, 0.5)",
    "rgba(43, 45, 65, 0.5)",
    "rgba(255, 255, 255, 0.5)",
    "rgba(194, 188, 193, 0.5)",
    "rgba(204, 62, 47, 0.5)",
  ];
  function getRandomColor() {
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
  }

  return (
    <li className="d-flex mb-4 justify-content-center">
      <a
        href={`/queries/${props.query._id}`}
        className="card mb-3 w-100"
        style={{
          maxHeight: "12rem",
          maxWidth: "80%",
          backgroundColor: getRandomColor(),
          textDecoration: "none",
          color: "black",
          borderRadius: "2em",
        }}
      >
        <div className="card-header">
          <h5 className="card-title">{props.query.title}</h5>
        </div>
        <div className="card-body">
          <p>
            age: {props.query.age}, goal: {props.query.goal}, gender:{" "}
            {props.query.gender}
          </p>
          <p className="card-text">{props.query.info.substring(0, 50)}...</p>
        </div>
      </a>
    </li>
  );
}

export default QueryCard;
