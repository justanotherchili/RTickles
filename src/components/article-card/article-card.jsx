import { Link } from "react-router-dom"
import "./article-card.css"
function ArticleCard(props){
  const {article} = props

  return(
    <>
    <Link to={`/article/${article.article_id}`}>

      <section className="article-card">
        <p>Topic: {article.topic}</p>
        <p>Title: {article.title}</p>
        <p>Author:{article.author}</p>
        <img src={`${article.article_img_url}`}/>
        <p>Votes: {article.votes}</p>
        <p>Comments: {article.comments}</p>
        <p>Posted: {new Date(article.created_at).toLocaleString()}</p>
      </section>
    </Link>
    </>
  )
}

export default ArticleCard