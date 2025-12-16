import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNewsList(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-5 min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-5">Latest News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
        {newsList.map(news => (
          <NewsCard key={news._id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default Home;
