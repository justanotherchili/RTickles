import axios from "axios";

const ncNewsAPI = axios.create({
  // baseURL: "http://localhost:9090/api"
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

async function patchVoteByArticleID(articleID, votes){
  const response = await ncNewsAPI.patch(`/articles/${articleID}`, votes)
  return response.data
}

export {getArticles, getArticleByID, getCommentsByArticleID, patchVoteByArticleID}