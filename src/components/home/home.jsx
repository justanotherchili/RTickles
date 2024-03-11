import { useEffect, useState } from "react"
import { getArticles } from "../../api"
import ArticleCard from "../article-card/article-card"
import "./home.css"

function Home(){
  const [articlesArray, setArticlesArray] = useState([])

  useEffect(() => {
    async function fetchArticles(){
      try{
        const articlesFromAPI = await getArticles()
        setArticlesArray(articlesFromAPI)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchArticles()
  }, [])

  return(
    <>
      <h1>Articles</h1>
      <section className="article-list">
        {articlesArray.map((article, index) => <ArticleCard key={index} article={article}/>)}
      </section>
    </>
  )
}

export default Home