import { useState } from "react";
import ArticlePage from "./components/article-page";
import Header from "./components/header";
import Articles from "./components/articles";
import { Routes, Route } from "react-router-dom";
import UserContext from "./contexts/User";
import TopicsNav from "./components/topics-nav";

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
          <Route path="/" element={<Articles />} />
          <Route path="/article/id/:article_id" element={<ArticlePage />} />
          <Route path="/articles/topic/:topicName" element={<Articles/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
