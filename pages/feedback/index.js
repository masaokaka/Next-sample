import { buildFeedbackPath, extractFeedback } from "../api/feedback";
import { Fragment, useState } from "react";

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState();
  const loadFeedbackHandler = (id) => {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback));
  };
  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Detail
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

//自分のプロジェクト内にあるapi処理にアクセスする場合、fetchなどで実行はせず、直接nodeのコードを記述する。
export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
