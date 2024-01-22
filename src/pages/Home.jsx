import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import FirebaseImageUpload from "../FirebaseImageupload";

const Header = ({ user, handleLogout }) => (
  <header style={styles.header}>
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Welcome to React Firebase Google Authentication
      </h1>
      <hr style={styles.hr} />
      {user && (
        <div style={styles.userInfo}>
          <img src={user.photoURL} alt="profile" style={styles.profileImage} />
          <div style={styles.userDetails}>
            <h2>Email: {user.email}</h2>
            <h2>Full Name: {user.displayName}</h2>
          </div>
        </div>
      )}
      <hr style={styles.hr} />
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  </header>
);

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <div style={styles.content}>
        <FirebaseImageUpload />
      </div>
    </>
  );
};

const styles = {
  header: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 0",
  },
  container: {
    textAlign: "center",
    maxWidth: "600px",
    margin: "auto",
  },
  heading: {
    marginBottom: "10px",
  },
  hr: {
    border: "1px solid #ddd",
    margin: "20px 0",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  profileImage: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  userDetails: {
    textAlign: "left",
  },
  logoutButton: {
    padding: "10px",
    backgroundColor: "#ff6347",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  content: {
    padding: "20px",
  },
};

export default Home;
