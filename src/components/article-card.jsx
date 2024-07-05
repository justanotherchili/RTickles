import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import "../styles/article-card.css";

function ArticleCard(props) {
  const { article } = props;

  return (
    <div className="card-container">
      <Link className="article-link" to={`/article/id/${article.article_id}`}>
        <div className="article-card">
          <img src={`${article.article_img_url}`} />
          <div className="card-content">
            <h3>{article.title}</h3>
            <div className="card-author-date">
              <p>By {article.author}</p>
              <p>{formatDistanceToNow(new Date(article.created_at), {addSuffix: true})}</p>
            </div>
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
            <div className="topic-name">
              <p>{article.topic}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ArticleCard;
