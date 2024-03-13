import "./comment-card.css"

function CommentCard(props){
  const {comment} = props
  console.log(comment)

  return(
    <>
    <section className="comment-card">
    <p>{comment.author}</p>
    <p>{comment.body}</p>
    <p>votes: {comment.votes}</p>
    <p>Posted: {new Date(comment.created_at).toLocaleString()}</p>
    </section>
    </>
  )
}

export default CommentCard