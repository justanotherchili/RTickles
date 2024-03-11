import "./article-card.css"
function ArticleCard(props){
  const {article} = props
  return(
    <>
      <section className="article-card">
        <p>{article.topic}</p>
        <p>{article.title}</p>
        <p>{article.body}</p>
        <p>{article.author}</p>
        <p>{article.votes}</p>
        <p>{article.comments}</p>
        <p>{article.created_at}</p>
      </section>
    </>
  )
}

export default ArticleCard