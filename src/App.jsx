import ArticleCard from "./components/article-card/article-card";
import ArticlePage from "./components/article-page/article-page";
import Header from "./components/header/header";
import Home from "./components/home/home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:article_id" element={<ArticlePage/>}/>
      </Routes>
    </>
  )
}

export default App
