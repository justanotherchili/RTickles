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
  return response.data.article
}

async function getCommentsByArticleID(articleID){
  const response = await ncNewsAPI.get(`/articles/${articleID}/comments`)
  return response.data.comments
}

export {getArticles, getArticleByID, getCommentsByArticleID}