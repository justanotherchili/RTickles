import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleByID,
  getCommentsByArticleID,
  patchVoteByArticleID,
  postCommentByArticleID,
} from "../api";
import CommentCard from "./comment-card";
import "../styles/article-page.css";
import UserContext from "../contexts/User";
import LoadingIndicator from "./loading-indicator";
import { formatDistanceToNow } from "date-fns";

function ArticlePage() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState(null);
  const [commentsArray, setCommentsArray] = useState([]);
  const [votes, setVotes] = useState(0);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [voted, setVoted] = useState(false);
  const [comment, setComment] = useState("");
  const [commentBoxActive, setCommentBoxActive] = useState(false);

  const { currUser } = useContext(UserContext);
  const commentInputRef = useRef(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoadingArticle(true);
        const articleFromAPI = await getArticleByID(article_id);
        setCurrArticle(articleFromAPI);
        setVotes(articleFromAPI.votes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingArticle(false);
      }
    }

    async function fetchComments() {
      try {
        setLoadingComments(true);
        const commentsFromAPI = await getCommentsByArticleID(article_id);
        setCommentsArray(commentsFromAPI);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingComments(false);
      }
    }

    fetchArticle();
    fetchComments();
  }, [article_id]);

  async function handleLikeClick() {
    const increment = voted ? -1 : 1;
    try {
      setVotes((prevVotes) => prevVotes + increment);
      setVoted((prevVoted) => !prevVoted);
      await patchVoteByArticleID(article_id, { inc_votes: increment });
    } catch (err) {
      console.error(err);
      setVotes((prevVotes) => prevVotes - increment);
      setVoted((prevVoted) => !prevVoted);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newComment = {
      body: comment,
      author: currUser.username,
      votes: 0,
      created_at: new Date().toISOString(),
    };
    try {
      setCommentsArray((prevComments) => [newComment, ...prevComments]);
      setComment("");
      await postCommentByArticleID(article_id, {
        body: comment,
        username: currUser.username,
      });
    } catch (err) {
      console.error(err);
    }
  }

  const handleCommentBoxClick = () => {
    setCommentBoxActive(true);
  };

  const handleCommentInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleBlur = () => {
    if (comment.trim() === "") {
      setCommentBoxActive(false);
    }
  };

  if (loadingArticle) {
    return <LoadingIndicator />;
  }

  return (
    <section className="article-page">
      <p className="article-page-topic-label">{currArticle.topic}</p>
      <h1 className="article-page-title">{currArticle.title}</h1>
      <div className="article-page-header">
        <p className="article-page-author">By {currArticle.author}</p>
        <p className="article-page-date">
          Posted {" "}
          {formatDistanceToNow(new Date(currArticle.created_at), {
            addSuffix: true,
          })}
        </p>
      </div>
      <img
        className="article-page-image"
        src={currArticle.article_img_url}
        alt="Article"
      />
      <p className="article-page-body">{currArticle.body}</p>
      <button
        onClick={handleLikeClick}
        className={`vote-button ${
          voted ? "button-clicked" : "button-unclicked"
        }`}
      >
        {votes} Votes
      </button>
      <p className="article-page-comment-count">
        {currArticle.comment_count} Comments
      </p>
      <form onSubmit={handleSubmit}>
        <div
          className={`comment-input-container ${
            commentBoxActive ? "active" : ""
          }`}
          onClick={handleCommentBoxClick}
        >
          <textarea
            className="comment-input"
            value={comment}
            onChange={handleCommentInputChange}
            onBlur={handleBlur}
            placeholder="Add a comment..."
          />
          {commentBoxActive && (
            <button className="comment-submit" type="submit">
              Post
            </button>
          )}
        </div>
      </form>
      {loadingComments ? (
        <LoadingIndicator />
      ) : (
        commentsArray.map((comment, index) => (
          <CommentCard
            key={index}
            comment={comment}
            commentsArray={commentsArray}
            setCommentsArray={setCommentsArray}
          />
        ))
      )}
    </section>
  );
}

export default ArticlePage;
