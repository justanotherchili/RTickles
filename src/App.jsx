import { useState } from "react";
import ArticlePage from "./components/article-page/article-page";
import Header from "./components/header/header";
import Home from "./components/home/home";
import { Routes, Route } from "react-router-dom";
import UserContext from "./contexts/User";
import TopicsNav from "./components/topics-nav/topics-nav";

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
        <TopicsNav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/id/:article_id" element={<ArticlePage />} />
          <Route path="/articles/topic/:topicName" element={<Home/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
