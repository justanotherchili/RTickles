import "./comment-card.css";
import UserContext from "../../contexts/User";
import { useContext } from "react";
import { deleteCommentByID } from "../../api";

function CommentCard(props) {
  const { comment, commentsArray, setCommentsArray } = props;
  const { currUser } = useContext(UserContext);
  const tempCommentsArray = [...commentsArray]
  async function handleDelete() {
    try {
      const arrayAfterDelete = commentsArray.filter(currCommmentInArray => currCommmentInArray.comment_id !== comment.comment_id)
      setCommentsArray(arrayAfterDelete)
      await deleteCommentByID(comment.comment_id)
      
   
    } catch (err) {
      setCommentsArray(tempCommentsArray)
      console.log(err);
    }
  }

  return (
    <>
      <section className="comment-card">
        <p>{comment.author}</p>
        <p>{comment.body}</p>
        <p>votes: {comment.votes}</p>
        <p>Posted: {new Date(comment.created_at).toLocaleString()}</p>
        {comment.author === currUser.username && (
          <button onClick={handleDelete}>X</button>
        )}
      </section>
    </>
  );
}

export default CommentCard;
