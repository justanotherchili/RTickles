import "../styles/comment-card.css";
import UserContext from "../contexts/User";
import { useContext } from "react";
import { deleteCommentByID } from "../api";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

function CommentCard(props) {
  const { comment, commentsArray, setCommentsArray } = props;
  const { currUser } = useContext(UserContext);
  const tempCommentsArray = [...commentsArray];

  async function handleDelete() {
    try {
      const arrayAfterDelete = commentsArray.filter(
        (currCommmentInArray) =>
          currCommmentInArray.comment_id !== comment.comment_id
      );
      setCommentsArray(arrayAfterDelete);
      await deleteCommentByID(comment.comment_id);
    } catch (err) {
      setCommentsArray(tempCommentsArray);
      alert(err);
    }
  }

  return (
    <section className="comment-card">
      <div className="comment-card-header">
        <p className="author">{comment.author}</p>
        <p className="posted">
          {" "}
          {formatDistanceToNow(new Date(comment.created_at), {
            addSuffix: true,
          })}
        </p>
      </div>
      <p className="body">{comment.body}</p>
      <p className="votes">{comment.votes} Votes</p>
      {comment.author === currUser.username && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </section>
  );
}

export default CommentCard;
