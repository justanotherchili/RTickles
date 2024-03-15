import { Link } from "react-router-dom"

function TopicCard(props){
  const {topicName} = props
  return(
    <>
    <section className="topic-card">
      <Link to={`/articles/topic/${topicName}`}><p>{topicName}</p></Link>
    </section>
    </>
  )
}

export default TopicCard