import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleByID } from "../../api";

function ArticlePage() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [commentsArray, setCommentsArray] = useState([]);

  useEffect(() => {
    async function fetchArticleByID() {
      const articleFromAPI = await getArticleByID(article_id);
      setCurrArticle(articleFromAPI);
    }
    fetchArticleByID();
    console.log(currArticle);
  }, []);

  return (
    <>
      <section>
        <p>{currArticle.author}</p>
        <p>/{currArticle.topic}</p>
        <p>{currArticle.title}</p>
        <p>{currArticle.body}</p>
        <img src={`${currArticle.article_img_url}`} />
        <p>{currArticle.votes}</p>
      </section>
      <section className="comment-section">
        
      </section>
    </>
  );
}

export default ArticlePage;
