import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleCard from "../article-card/article-card";
import "./home.css";
import { useParams } from "react-router-dom";
import { sortArticleDesc, sortArticleAsc } from "../../utils/sort-by";

function Home() {
  const [articlesArray, setArticlesArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const { topicName } = useParams();
  console.log(articlesArray);
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
      console.log(err);
    }
  }
  useEffect(() => {
    fetchArticles();
  }, [topicName, sortBy, sortOrder]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Articles</h1>
          {Object.keys(sortOptions).map((option, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setSortBy(sortOptions[option]);
                }}
                disabled={sortBy === sortOptions[option]}
              >
                {option}
              </button>
            );
          })}

          <button
            onClick={() => {
              setSortOrder("ascending");
            }}
            disabled={sortOrder === "ascending"}
          >
            ascending
          </button>
          <button
            onClick={() => {
              setSortOrder("descending");
            }}
            disabled={sortOrder === "descending"}
          >
            descending
          </button>

          <section className="article-list">
            {articlesArray.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </section>
        </>
      )}
    </>
  );
}

export default Home;
