import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname !== "/") {
      navigate("/"); // Go to home
    } else {
      window.location.reload(); // Reload page if already on home
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="px-4">
      <Navbar.Brand onClick={handleHomeClick} style={{ cursor: "pointer" }}>
        Job Management
      </Navbar.Brand>
      <Nav className="ms-auto">
        <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
        <Nav.Link onClick={() => navigate("/find-jobs")}>Find Jobs</Nav.Link>
        <Nav.Link onClick={() => navigate("/find-talents")}>Find Talents</Nav.Link>
        <Nav.Link onClick={() => navigate("/about")}>About Us</Nav.Link>
        <Nav.Link onClick={() => navigate("/testimonials")}>Testimonials</Nav.Link>
        <Button variant="primary" onClick={() => navigate("/job-details/1")}>
          Create Jobs
        </Button>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
