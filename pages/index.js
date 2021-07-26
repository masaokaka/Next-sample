import Head from "next/head";
import { useRef, useState } from "react";

const HomePage = (props) => {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    const reqbody = {
      email: enteredEmail,
      feedback: enteredFeedback,
    };
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqbody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  };

  const loadFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  };
  return (
    <div>
      <Head>
        <title>Next.js Events</title>
        {/* Googleとかで検索した時に検索結果ページに表示される文章が以下のmetaタグのcontentになる */}
        <meta name="description" content="Find a lot of great events" />
      </Head>
      <div>
        <h1>The Home Page</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="email">Your Email Address</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div>
            <label htmlFor="feedback">Your Feedback Address</label>
            <textarea id="feedback" rows="5" ref={feedbackInputRef} />
          </div>
          <button>Send Feedback</button>
        </form>
        <hr />
        <button onClick={loadFeedbackHandler}>Load Feedback</button>
        <ul>
          {feedbackItems.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
