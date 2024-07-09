import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./article-card";
import "../styles/articles.css";
import { useParams } from "react-router-dom";
import { sortArticleDesc, sortArticleAsc } from "../utils/sort-by";
import LoadingIndicator from "./loading-indicator";

function Articles() {
  const [articlesArray, setArticlesArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const { topicName } = useParams();
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("descending");
  const [sortOptions, setSortOptions] = useState({
    votes: "votes",
    comments: "comment_count",
    posted: "created_at",
  });

  async function fetchArticles() {
    try {
      setLoading(true);
      const articlesFromAPI = await getArticles(topicName);
      if (sortBy) {
        setArticlesArray(
          sortOrder === "descending"
            ? sortArticleDesc(sortBy, articlesFromAPI)
            : sortArticleAsc(sortBy, articlesFromAPI)
        );
      } else {
        setArticlesArray(articlesFromAPI);
      }
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    fetchArticles();
  }, [topicName, sortBy, sortOrder]);

  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  function handleSortOrder(e) {
    setSortOrder(e.target.value);
  }

  return (
    <section className="page">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="articles-header">
            {topicName ? (
              <h2 className="topic-title">
                {topicName[0].toUpperCase() + topicName.slice(1)}{" "}
              </h2>
            ) : (
              <h2 className="topic-title">All Articles</h2>
            )}
            <div className="query-menus">
              <select value={sortBy} onChange={handleSortBy}>
                <option value="created_at">Date</option>
                <option value="title">Title</option>
                <option value="votes">Votes</option>
                <option value="author">Author</option>
                <option value="comment_count">Comments</option>
              </select>
              <select value={sortOrder} onChange={handleSortOrder}>
                <option value="descending">Descending</option>
                <option value="ascending">Ascending</option>
              </select>
            </div>
          </div>
          <ul className="article-list">
            {articlesArray.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default Articles;
