import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import RegisterForm from "./components/StudentRegisterPage/RegisterForm";
import ShowStudentListPage from "./pages/ShowStudentListPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/student-register" element={<RegisterForm />} />
        <Route path="/all-students" element={<ShowStudentListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
