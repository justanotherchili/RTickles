import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleByID, getCommentsByArticleID } from "../../api";
import CommentCard from "../comment-card/comment-card";

function ArticlePage() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [commentsArray, setCommentsArray] = useState([]);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [loadingComments, setLoadingComments] = useState([]);

  useEffect(() => {
    async function fetchArticleByID() {
      try {
        setLoadingArticle(true);
        const articleFromAPI = await getArticleByID(article_id);
        setCurrArticle(articleFromAPI);
        setLoadingArticle(false);
      } catch (err) {
        console.log(err);
      }
    }
    async function fetchCommentsByArticleID() {
      try {
        setLoadingComments(true);
        const commentsFromAPI = await getCommentsByArticleID(article_id);
        setCommentsArray(commentsFromAPI);
        setLoadingComments(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchArticleByID();
    fetchCommentsByArticleID();
  }, []);

  return (
    <>
      <>
        {loadingArticle ? (
          <p>Loading...</p>
        ) : (
          <section>
            <p>Topic: {currArticle.topic}</p>
            <p>Author: {currArticle.author}</p>
            <p>Title: {currArticle.title}</p>
            <p>{currArticle.body}</p>
            <img src={`${currArticle.article_img_url}`} />
            <p>Votes: {currArticle.votes}</p>
            <p>Comments: {currArticle.comment_count}</p>
            <p>Posted: {new Date(currArticle.created_at).toLocaleString()}</p>
          </section>
        )}
      </>
      {loadingComments ? (
        <p>Loading...</p>
      ) : (
        <section>
          {commentsArray.map((comment, index) => (
            <CommentCard key={index} comment={comment} />
          ))}
        </section>
      )}
      <></>
    </>
  );
}

export default ArticlePage;
