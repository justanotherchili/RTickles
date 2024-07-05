import { useContext, useEffect, useState } from "react";
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

function ArticlePage() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [commentsArray, setCommentsArray] = useState([]);
  const [votes, setVotes] = useState(0);

  const [loadingArticle, setLoadingArticle] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  const [voted, setVoted] = useState(false);
  const [comment, setComment] = useState("");

  const { currUser } = useContext(UserContext);

  async function fetchArticleByID() {
    try {
      setLoadingArticle(true);
      const articleFromAPI = await getArticleByID(article_id);
      setCurrArticle(articleFromAPI);
      setLoadingArticle(false);

      setVotes(articleFromAPI.votes); //is it bad to put this here if its not really related to fetching the article
    } catch (err) {
      alert(err);
    }
  }
  async function fetchCommentsByArticleID() {
    try {
      setLoadingComments(true);
      const commentsFromAPI = await getCommentsByArticleID(article_id);
      setCommentsArray(commentsFromAPI);
      setLoadingComments(false);
    } catch (err) {
      alert(err);
    }
  }
  async function handleLikeClick(article_id) {
    try {
      const incremenmt = voted ? -1 : 1;
      setVotes((prevVotes) => prevVotes + incremenmt);
      setVoted((prevVoted) => !prevVoted);
      await patchVoteByArticleID(article_id, { inc_votes: incremenmt });
    } catch (err) {
      setVotes((prevVotes) => prevVotes - incremenmt);
      setVoted((prevVoted) => !prevVoted);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setCommentsArray([
        {
          body: comment,
          author: currUser.username,
          votes: 0,
          created_at: new Date(),
        },
        ...commentsArray,
      ]);
     
      await postCommentByArticleID(currArticle.article_id, {
        body: comment,
        username: currUser.username,
      });
 
      setComment("");
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    fetchArticleByID();
    fetchCommentsByArticleID();
  }, []);

  return (
    <>
      <>
        {loadingArticle ? (
          <LoadingIndicator/>
        ) : (
          <section>
            <p>Topic: {currArticle.topic}</p>
            <p>Author: {currArticle.author}</p>
            <p>Title: {currArticle.title}</p>
            <p>{currArticle.body}</p>
            <img src={`${currArticle.article_img_url}`} />
            <p>Votes: {votes}</p>
            <p>Comments: {currArticle.comment_count}</p>
            <p>Posted: {new Date(currArticle.created_at).toLocaleString()}</p>
            <button
              onClick={() => handleLikeClick(currArticle.article_id)}
              className={voted ? "button-clicked" : "button-unclicked"}
            >
              Vote
            </button>
          </section>
        )}
      </>
      <>
        <section className="post-comment">
          <form onSubmit={handleSubmit}>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </form>
          <button onClick={handleSubmit} type="submit">
            Post
          </button>
        </section>
      </>
      <>
        {loadingComments ? (
          <LoadingIndicator/>
        ) : (
          <section>
            {commentsArray.map((comment, index) => (
              <CommentCard key={index} comment={comment} commentsArray={commentsArray} setCommentsArray={setCommentsArray}/>
            ))}
          </section>
        )}
      </>
    </>
  );
}

export default ArticlePage;
