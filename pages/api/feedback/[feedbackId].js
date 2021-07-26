//パラメータを含めたリクエストができる　/feedback/[feedbackId]

import { extractFeedback, buildFeedbackPath } from ".";

function handler(req, res) {
  //ハンドラーfunctionのなかでメソッドによって条件を分岐させることもできる。
  // if (req.method === "DELETE") {  
  // }

  //urlパラメータにアクセス
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );
  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
