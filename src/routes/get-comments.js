import Comments from "../models/comments";

export default async function getComments(req, res, next) {
  const { commentor } = req.query;

  const comments = await Comments.find({ commentor });

  console.log(comments);

  res.status(200).json({
    comments,
  });
}
