import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const logout = async () => {
    await fetch("/api/auth/logout", { credentials: "include" });
    dispatch({ type: "USER", payload: false });
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  const linkStyle = {
    color: "#1f2937",
    textDecoration: "none",
    fontWeight: "500",
    padding: "5px 8px",
  };

  const buttonStyle = {
    padding: "6px 14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "0.95rem",
    border: "1px solid #1f2937",
    background: "#1f2937",
    color: "#fff",
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 24px",
        background: "#fff",
        borderBottom: "1px solid #000",
      }}
    >
      {/* LEFT: LOGO */}
      <div
        onClick={() => navigate("/")}
        style={{
          fontWeight: "700",
          fontSize: "1.5rem",
          cursor: "pointer",
          color: "#1f2937",
        }}
      >
        HUB
      </div>

      {/* RIGHT SIDE: LINKS + SEARCH + AUTH */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* LINKS */}
        <Link to="/" style={linkStyle}>All</Link>
        <Link to="/science" style={linkStyle}>Science</Link>
        <Link to="/sports" style={linkStyle}>Sports</Link>
        <Link to="/entertainment" style={linkStyle}>Entertainment</Link>
        <Link to="/politics" style={linkStyle}>Politics</Link>
        <Link to="/education" style={linkStyle}>Education</Link>

        {/* SEARCH */}
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "6px" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            style={{
              padding: "6px 10px",
              border: "1px solid #1f2937",
              borderRadius: "5px",
              outline: "none",
              width: "140px",
            }}
          />
          <button type="submit" style={buttonStyle}>Go</button>
        </form>

        {/* AUTH */}
        {state ? (
          <>
            <Link to="/profile" style={buttonStyle}>Profile</Link>
            <button onClick={logout} style={buttonStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={buttonStyle}>Login</Link>
            <Link to="/signup" style={buttonStyle}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
