import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// ✅ Static imports
import amazonLogo from "../assets/logos/amazon.png";
import facebookLogo from "../assets/logos/facebook.png";
import cyberworksLogo from "../assets/logos/cyberworks.png";
import ibmLogo from "../assets/logos/ibm.png";
import googleLogo from "../assets/logos/google.png";
import teslaLogo from "../assets/logos/tesla.png";
import netflixLogo from "../assets/logos/netflix.png";
import microsoftLogo from "../assets/logos/microsoft.png";
import defaultLogo from "../assets/logos/default.png"; // fallback logo

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  // 🧠 Match company name to logo
  const getLogo = (company) => {
    switch (company.toLowerCase()) {
      case "amazon":
        return amazonLogo;
      case "facebook":
        return facebookLogo;
      case "cyberworks":
        return cyberworksLogo;
      case "ibm":
        return ibmLogo;
      case "google":
        return googleLogo;
      case "tesla":
        return teslaLogo;
      case "netflix":
        return netflixLogo;
      case "microsoft":
        return microsoftLogo;

      default:
        return defaultLogo;
    }
  };

  // ⏳ Format posted time
  const getTimeAgo = (dateString) => {
    if (!dateString) return "Posted recently";
    const postedDate = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - postedDate) / 60000);
    if (diffInMinutes < 60) return `Posted ${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Posted ${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Posted ${diffInDays} days ago`;
  };

  return (
    <Card style={styles.card}>
      {/* ✅ Logo */}
      <div style={styles.logoContainer}>
        <Card.Img variant="top" src={getLogo(job.company)} alt={job.company} style={styles.logo} />
      </div>

      <Card.Body>
        <h5 style={styles.companyName}>{job.company}</h5>
        <Card.Title style={styles.title}>{job.title}</Card.Title>
        <Card.Text style={styles.details}>
          {job.experience} | {job.location} | {job.salary}
        </Card.Text>
        <Card.Text style={styles.description}>
          <strong>Description:</strong>{" "}
          {job.description
            ? job.description.length > 100
              ? `${job.description.substring(0, 100)}...`
              : job.description
            : "No description available"}
        </Card.Text>
        <small style={styles.timestamp} className="text-muted">
          {getTimeAgo(job.posted_at)}
        </small>
        <Button style={styles.button} onClick={() => navigate()}>
          Apply Now
        </Button>
      </Card.Body>
    </Card>
  );
};

// 🧾 Styles
const styles = {
  card: {
    borderRadius: "10px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    margin: "10px",
    textAlign: "center",
  },
  logoContainer: {
    textAlign: "center",
    padding: "10px",
  },
  logo: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    margin: "auto",
  },
  companyName: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  details: {
    fontSize: "14px",
    color: "gray",
  },
  description: {
    fontSize: "13px",
    color: "#555",
    marginTop: "5px",
    textAlign: "left",
  },
  timestamp: {
    display: "block",
    fontSize: "12px",
    color: "#888",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#007bff",
    border: "none",
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
  },
};

export default JobCard;
