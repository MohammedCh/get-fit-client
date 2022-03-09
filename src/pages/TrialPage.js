import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function TrialPage() {
  return (
    <div>
      <h1>trial Page</h1>
      <div className="card-header d-flex justify-content-between align-items-center p-3">
        <button className="mr-auto p-2 col-0">Back</button>
        <Link to="hi" className="fw-bold mb-0 col-11">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
            alt="avatar"
            className="rounded-circle me-3 shadow-1-strong"
            width={60}
          />
          <span>Brad Pitt - <i>view profile</i></span>
        </Link>
      </div>
      <ul className="list-unstyled">
        <li className="d-flex mb-4">
          <div className="card" style={{ width: "75%" }}>
            <div className="card-body">
              <p className="mb-0 p-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-muted small mb-0 p-1">
                <i className="far fa-clock" /> 13 mins ago
              </p>
            </div>
          </div>
        </li>
        <li className="d-flex justify-content-end mb-4">
          <div className="card" style={{ width: "75%" }}>
            <div className="card-body d-flex flex-column p-3">
              <p className="mb-0 p-1">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium.
              </p>
              <p className="text-muted small mb-0 p-1">
                <i className="far fa-clock" /> 13 mins ago
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default TrialPage;

// return (
//   <div className="QueryDetails">
//     {!isLoading && (
//       <div className="container">
//         <h1>{query.title}</h1>
//         <div className="row" style={{ textAlign: "left" }}>
//           <div className="col-sm-3 py-2">
//             <div className="row">
//               <div className="col-5 order-1" style={{ textAlign: "right" }}>
//                 <b>Age:</b>
//               </div>
//               <div className="col-5 order-4" style={{ textAlign: "right" }}>
//                 <b>Gender:</b>
//               </div>
//               <div className="col-5 order-7" style={{ textAlign: "right" }}>
//                 <b>Goal:</b>
//               </div>
//               <div className="col-5 order-2" style={{ textAlign: "left" }}>
//                 {query.age}
//               </div>
//               <div className="col-5 order-5" style={{ textAlign: "left" }}>
//                 {query.gender}
//               </div>
//               <div className="col-5 order-8" style={{ textAlign: "left" }}>
//                 {query.goal}
//               </div>
//             </div>
//             {user.type === "trainer" && (
//               <div
//                 className="d-flex justify-content-center py-1"
//                 style={{ textAlign: "left" }}
//               >
//                 {/* <form onSubmit={handleReplySubmit}>
//                   <button type="submit">Reply</button>
//                 </form> */}
//                 <Link to="/new-conversations" state={{ query }}>
//                   <button>Reply</button>
//                 </Link>
//               </div>
//             )}
//             {user.type === "trainee" && (
//               <div>
//                 <div
//                   className="d-flex justify-content-center py-1"
//                   style={{ textAlign: "left" }}
//                 >
//                   <Link to="/">
//                     <button>Delete Query</button>
//                   </Link>
//                 </div>
//                 <div
//                   className="d-flex justify-content-center py-1"
//                   style={{ textAlign: "left" }}
//                 >
//                   <Link to={`/projects/edit/${queryId}`}>
//                     <button>Edit Query</button>
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="col">{query.info}</div>
//         </div>
//       </div>
//     )}
//   </div>
// );
// }