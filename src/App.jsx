import { useState } from "react";
import ArticleCard from "./components/article-card/article-card";
import ArticlePage from "./components/article-page/article-page";
import Header from "./components/header/header";
import Home from "./components/home/home";
import { Routes, Route } from "react-router-dom";
import UserContext from "./contexts/User";

function App() {
  const [currUser, setCurrUser] = useState({
    username: "jessjelly",
    name: "jessjelly",
    avatar_url:
      "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
  });
  return (
    <>
      <UserContext.Provider value={{currUser: currUser}}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:article_id" element={<ArticlePage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
