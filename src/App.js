// App.js

import React, { useState, useEffect } from "react";

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=bf05e43637114d8887b06bdd5cbc40e3'
      );
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setNews(data.articles); // Assuming 'articles' is an array in the response
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>📰 Latest News</h1>
      {loading && <p style={styles.message}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && !error && news.length === 0 && (
        <p style={styles.message}>No news available</p>
      )}
      <div style={styles.newsGrid}>
        {news.map((article, index) => (
          <div key={index} style={styles.card}>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                style={styles.image}
              />
            )}
            <div style={styles.content}>
              <h2 style={styles.title}>{article.title}</h2>
              <p style={styles.description}>
                {article.description || "No description available"}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.readMore}
              >
                Read More ➡️
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline styles for better UI
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  message: {
    textAlign: "center",
    color: "#666",
    fontSize: "18px",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: "18px",
  },
  newsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.2s",
  },
  cardHover: {
    transform: "scale(1.02)",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  content: {
    padding: "15px",
  },
  title: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "10px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
  },
  readMore: {
    display: "inline-block",
    color: "#007BFF",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "bold",
  },
};

export default App;
