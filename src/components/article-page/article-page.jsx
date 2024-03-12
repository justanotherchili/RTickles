import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleByID } from "../../api";

function ArticlePage() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [commentsArray, setCommentsArray] = useState([]);
  const [loadingArticle, setLoadingArtcle] = useState(true);

  useEffect(() => {
    async function fetchArticleByID() {
      try {
        setLoading(true);
        const articleFromAPI = await getArticleByID(article_id);
        setCurrArticle(articleFromAPI);
        setLoadingArtcle(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchArticleByID();
  }, []);

  return (
    <>
      {loadingArticle ? (
        <p>Loading...</p>
      ) : (
        <>
          <section>
            <p>Topic: {currArticle.topic}</p>
            <p>Author: {currArticle.author}</p>
            <p>Title: {currArticle.title}</p>
            <p>{currArticle.body}</p>
            <img src={`${currArticle.article_img_url}`} />
            <p>Votes: {currArticle.votes}</p>
          </section>
        </>
      )}
    </>
  );
}

export default ArticlePage;
