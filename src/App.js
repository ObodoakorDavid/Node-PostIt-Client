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
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <RootLayout>
                  <LandingPage />
                </RootLayout>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* ==================================================== */}
            <Route element={<PrivateRoute />}>
              <Route
                path="/dashboard"
                element={
                  <RootLayout>
                    <Dashboard />
                  </RootLayout>
                }
              />
              <Route
                path="/stories"
                element={
                  <RootLayout>
                    <Stories />
                  </RootLayout>
                }
              />
              <Route
                path="/my-stories"
                element={
                  <RootLayout>
                    <MyStories />
                  </RootLayout>
                }
              >
                <Route path="/my-stories" element={<AllUserStories />} />
                <Route path="drafts" element={<DraftUserStories />} />
                <Route path="published" element={<PublishedUserStories />} />
              </Route>
              <Route
                path="/create"
                element={
                  <RootLayout>
                    <CreateStory />
                  </RootLayout>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <RootLayout>
                    <EditStory />
                  </RootLayout>
                }
              />
              <Route
                path="/story/:id"
                element={
                  <RootLayout>
                    <StoryDetail />
                  </RootLayout>
                }
              />
            </Route>
            <Route
              path="*"
              element={
                <RootLayout>
                  <Error404 />
                </RootLayout>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
