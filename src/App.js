/** @format */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Stories from "./pages/Stories";
import MyStories from "./pages/MyStories";
import CreateStory from "./pages/CreateStory";
import EditStory from "./pages/EditStory";
import AllUserStories from "./components/AllUserStories";
import DraftUserStories from "./components/DraftUserStories";
import PublishedUserStories from "./components/PublishedUserStories";
import StoryDetail from "./pages/StoryDetail";
import Error404 from "./components/Error404";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* ==================================================== */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/my-stories" element={<MyStories />}>
                <Route path="/my-stories" element={<AllUserStories />} />
                <Route path="drafts" element={<DraftUserStories />} />
                <Route path="published" element={<PublishedUserStories />} />
              </Route>
              <Route path="/create" element={<CreateStory />} />
              <Route path="/edit/:id" element={<EditStory />} />
              <Route path="/story/:id" element={<StoryDetail />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
