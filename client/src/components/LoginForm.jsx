import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

/* 🔒 ONE BRAND COLOR (same as Navbar logo & buttons) */
const BRAND_COLOR = "#1f2937";

const LoginForm = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({ type: "USER", payload: true });
      navigate("/profile");
    } else {
      alert(data.error || "Login failed");
    }
  };

  /* INPUT STYLE */
  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    outline: "none",
    color: BRAND_COLOR,
    background: "#fff",
  };

  /* BUTTON STYLE (same as SignUp) */
  const buttonStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: `1px solid ${BRAND_COLOR}`,
    background: BRAND_COLOR,
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          padding: "35px",
          borderRadius: "12px",
          background: "#fff",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: BRAND_COLOR,
          }}
        >
          Login
        </h2>

        <form onSubmit={postData} style={{ display: "grid", gap: "15px" }}>
          {["email", "password"].map((field) => (
            <input
              key={field}
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={credentials[field]}
              onChange={handleInputs}
              style={inputStyle}
              required
            />
          ))}

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
