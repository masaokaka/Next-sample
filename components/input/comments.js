import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { postComment } from "../../helpers/api-utils";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingCommnets] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingCommnets(true);
      fetch(`/api/comments/${eventId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingCommnets(false);
        });
    }
  }, [showComments]);
  async function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "sending comment ...",
      message: "your comment is being posted.",
      status: "pending",
    });
    try {
      await postComment(commentData, eventId);
      notificationCtx.showNotification({
        title: "Success!",
        message: "your comment has been posted.",
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Failed",
        message: error.message || "error occured",
        status: "error",
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading ... </p>}
    </section>
  );
}

export default Comments;
