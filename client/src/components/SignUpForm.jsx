import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const BRAND_COLOR = "#1f2937";

const SignUpForm = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", //  for cookies
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.status === 201) {
        dispatch({ type: "USER", payload: true });
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/profile");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    outline: "none",
    color: BRAND_COLOR,
    background: "#fff",
  };

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
          Sign Up
        </h2>

        <form onSubmit={postData} style={{ display: "grid", gap: "15px" }}>
          {[
            "firstName",
            "lastName",
            "userName",
            "phone",
            "email",
            "password",
          ].map((field) => (
            <input
              key={field}
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={user[field]}
              onChange={handleInputs}
              style={inputStyle}
              required
            />
          ))}

          <button type="submit" style={buttonStyle}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
