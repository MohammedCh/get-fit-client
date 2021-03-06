import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function TextBubble(props) {
  const { user } = useContext(AuthContext);

  return (
    <li
      className={`d-flex mb-4 ${
        user._id === props.message.senderId ? "justify-content-end" : ""
      }`}
    >
      <div
        className="card text-white"
        style={{
          width: "75%",
          backgroundColor: `${
            user._id === props.message.senderId
              ? "rgba(116,106,117,0.8)"
              : "rgba(133,147,86,0.95)"
          }`,
        }}
      >
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
