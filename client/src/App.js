import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/Navbar";
import { JobProvider } from "./context/JobContext";
import Jobs from "./pages/Jobs";
import CreateJobPage from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <JobProvider>
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/create-job" element={<CreateJobPage />} /> 
      </Routes>
    </Router>
    </JobProvider>
  );
}
export default App;
