import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import NewsCard from "../components/NewsCard";

const Profile = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [editingNewsId, setEditingNewsId] = useState(null);

  // New news state
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newMedia, setNewMedia] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/profile", { credentials: "include" });
        if (!res.ok) return navigate("/login");
        const data = await res.json();
        setUserData(data.user);
        dispatch({ type: "USER", payload: true });
        fetchNews();
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNewsList(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [navigate, dispatch]);

  const handleSubmit = async (e, newsId = null, title, description, media) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (media) formData.append("media", media);

    try {
      const url = newsId ? `/api/news/${newsId}` : "/api/news";
      const method = newsId ? "PUT" : "POST";
      const res = await fetch(url, { method, body: formData, credentials: "include" });
      if (!res.ok) throw new Error("Failed");

      const newsRes = await fetch("/api/news");
      const newsData = await newsRes.json();
      setNewsList(newsData);

      if (!newsId) {
        setNewTitle("");
        setNewDescription("");
        setNewMedia(null);
      }
      setEditingNewsId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to submit news");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/news/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      setNewsList(newsList.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="p-5 min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="flex flex-col lg:flex-row gap-5 w-full max-w-6xl mb-5">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-5 flex-1">
          <h2 className="text-2xl font-bold text-center mb-2">
            {userData.firstName} {userData.lastName}
          </h2>
          <p><strong>Username:</strong> {userData.userName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
        </div>

        {/* Create News Form */}
        <div className="bg-white rounded-lg shadow-md p-5 flex-1">
          <h3 className="text-xl font-semibold mb-3">Create News / Media</h3>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => handleSubmit(e, null, newTitle, newDescription, newMedia)}
          >
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
              className="border p-2 rounded"
              required
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
              className="border p-2 rounded"
              required
            />
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setNewMedia(e.target.files[0])}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#1f2937] text-white rounded hover:bg-gray-800 transition"
            >
              Create News
            </button>
          </form>
        </div>
      </div>

      {/* News List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
        {newsList.map((news) => (
          <div key={news._id}>
            {editingNewsId === news._id ? (
              <EditNewsForm
                news={news}
                onCancel={() => setEditingNewsId(null)}
                onSubmit={handleSubmit}
              />
            ) : (
              <NewsCard
                news={news}
                onEdit={() => setEditingNewsId(news._id)}
                onDelete={() => handleDelete(news._id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const EditNewsForm = ({ news, onCancel, onSubmit }) => {
  const [title, setTitle] = useState(news.title);
  const [description, setDescription] = useState(news.description);
  const [media, setMedia] = useState(null);

  return (
    <form
      className="bg-white p-4 rounded shadow-md flex flex-col gap-2"
      onSubmit={(e) => onSubmit(e, news._id, title, description, media)}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
        placeholder="Description"
        required
      />
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setMedia(e.target.files[0])}
      />
      <div className="flex justify-between mt-2">
        <button
          type="submit"
          className="px-3 py-1 bg-[#1f2937] text-white rounded hover:bg-gray-800 transition"
        >
          Update
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Profile;
