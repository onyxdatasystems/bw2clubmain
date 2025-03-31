import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeFeed from "./pages/HomeFeed";
import ProfilePage from "./pages/UserProfile";
import UserProfileEdit from "./pages/UserProfileEdit";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/home" element={<HomeFeed />} />
        <Route path="/user-profile" element={<ProfilePage />} />
        <Route path="/profile-edit" element={<UserProfileEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
