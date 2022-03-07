import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function TextBubble(props) {
  const { user } = useContext(AuthContext);
  console.log(props);
  console.log(props.message);
  return (
    <li
      className={`d-flex mb-4 ${
        user._id === props.message.senderId ? "justify-content-end" : ""
      }`}
    >
      <div className="card" style={{ width: "75%" }}>
        <div className="card-body">
          <p className="mb-0 p-1">{props.message.message}</p>
          <p className="text-muted small mb-0 p-1">
            <i className="far fa-clock" /> {props.message.timestamp}
          </p>
        </div>
      </div>
    </li>
  );
}

export default TextBubble;
