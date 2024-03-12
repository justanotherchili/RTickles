import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: "https://chili-news.onrender.com/api"
})

async function getArticles(){
  const response = await ncNewsAPI.get("/articles")
  return response.data.articles

}

async function getArticleByID(articleID){
  const response = await ncNewsAPI.get(`/articles/${articleID}`)
  console.log(response.data)
  return response.data.article
}

export {getArticles, getArticleByID}