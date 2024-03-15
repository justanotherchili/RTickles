import { Link } from "react-router-dom";
import { getTopics } from "../../api";
import { useEffect, useState } from "react";
import TopicCard from "../topics-card/topics-card";

function TopicsNav() {
  const [topicsArray, setTopicsArray] = useState([]);
  async function fetchTopics() {
    try {
      const topicsFromAPI = await getTopics();
      setTopicsArray(topicsFromAPI);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchTopics();
  }, []);
  return (
    <>
      <h2>Topics</h2>
      <nav>
        {topicsArray.map((topic, index) => {
          return <TopicCard key={index} topicName={topic.slug} />;
        })}
      </nav>
    </>
  );
}
export default TopicsNav
