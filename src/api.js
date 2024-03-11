import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: "https://chili-news.onrender.com/api"
})

async function getArticles(){
  const response = await ncNewsAPI.get("/articles")
  console.log(response)
  return response.data.articles

}

export {getArticles}