const express = require("express");

const blogRouter = express.Router();
const blogController = require("../controllers/blog-controller");
// console.log("hi blog CA", blogController.blogPost)
// middile-ware is validate 
const validate = require("../middlewares/validate-middleware");
const blogValidator = require("../validators/blog-validator");
// console.log(blogValidator.blogPostSchema)

// console.log(blogController.blogPost(req, res))
// { blogPost, blogDelete, commentPost, commentDelete, getAllBlogByUser, getAllComments, getAllblogs, updateBlog, blogReact }
blogRouter
    .route("/blogPost")
    .post(validate(blogValidator.blogPostSchema), blogController.blogPost);
blogRouter
    .route("/blogDelete")
    .post(validate(blogValidator.blogDeleteSchema), blogController.blogDelete);
blogRouter
    .route("/commentPost")
    .post(validate(blogValidator.commentSchema), blogController.commentPost);
blogRouter
    .route("/commentDelete")
    .post(validate(blogValidator.commentDeleteSchema), blogController.commentDelete)
blogRouter
    .route("/getAllComments")
    .get(blogController.getAllComments);
blogRouter
    .route("/getAllBlogByUser")
    .get(blogController.getAllBlogByUser)
blogRouter
    .route("/getAllBlogs")
    .get(blogController.getAllblogs);
blogRouter
    .route("/updateBlog")
    .put(blogController.updateBlog);
blogRouter
    .route("/blogReaction")
    .put(blogController.blogReact)

module.exports = blogRouter;