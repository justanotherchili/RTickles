import { NavLink } from "react-router-dom";
import { getTopics } from "../api";
import { useEffect, useState } from "react";

import "../styles/topics-nav.css";
function TopicsNav() {
  const [topicsArray, setTopicsArray] = useState([]);
  async function fetchTopics() {
    try {
      const topicsFromAPI = await getTopics();
      setTopicsArray(topicsFromAPI);
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    fetchTopics();
  }, []);
  return (
    <>
      <nav>
        {topicsArray.map((topic, index) => {
          return (
            <NavLink
              className="nav-link"
              to={`/articles/topic/${topic.slug}`}
              key={index}
            >
              <li>{topic.slug[0].toUpperCase() + topic.slug.slice(1)}</li>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
export default TopicsNav;
