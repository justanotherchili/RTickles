import { Link } from "react-router-dom"
import "./article-card.css"
function ArticleCard(props){
  console.log(props)
  const {article} = props

  return(
    <>
    <Link to={`/article/${article.article_id}`}>
    
      <section className="article-card">
        <p>{article.topic}</p>
        <p>{article.title}</p>
        <p>{article.body}</p>
        <p>{article.author}</p>
        <p>{article.votes}</p>
        <p>{article.comments}</p>
        <p>{article.created_at}</p>
      </section>
    </Link>
    </>
  )
}

export default ArticleCard