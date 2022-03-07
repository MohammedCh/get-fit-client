import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import QueryListPage from "./pages/QueryListPage";
import QueryDetails from "./pages/QueryDetails";
import QueryCreate from "./pages/QueryCreate";
import QueryEditPage from "./pages/QueryEditPage";
import TrainerProfile from "./pages/TrainerProfile";
import ConversationList from "./pages/ConversationsList";
import Conversation from "./pages/Conversation";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/queries"
          element={
            <IsPrivate>
              <QueryListPage />
            </IsPrivate>
          }
        />
        <Route
          path="/queries/:queryId"
          element={
            <IsPrivate>
              <QueryDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/queries/create"
          element={
            <IsPrivate>
              <QueryCreate />
            </IsPrivate>
          }
        />
        <Route
          path="/projects/edit/:projectId"
          element={
            <IsPrivate>
              <QueryEditPage />
            </IsPrivate>
          }
        />

        <Route
          path="/trainer/profile/:trainerId"
          element={
            <IsPrivate>
              <TrainerProfile />
            </IsPrivate>
          }
        />
        <Route
          path="/trainer/profile"
          element={
            <IsPrivate>
              <TrainerProfile />
            </IsPrivate>
          }
        />
        <Route
          path="/conversations/"
          element={
            <IsPrivate>
              <ConversationList />
            </IsPrivate>
          }
        />
        <Route
          path="/conversations/:conversationId"
          element={
            <IsPrivate>
              <Conversation />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
