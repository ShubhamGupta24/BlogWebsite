const mongoose = require("mongoose")

// Define schema for comments
const commentSchema = new mongoose.Schema({
    commenterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        required: true
    }
});

// Define schema for blog post
const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    bloggerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to a user who authored the post
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    //keep in mind whenever user likes just do likes+1 and dislikes+0 & vice verse
    like: {
        type: Number,
        required: true
    },
    dislike: {
        type: Number,
        required: true
    },
});



const BlogPost = mongoose.model('Blog', blogPostSchema);
const CommentPost = mongoose.model('Comment', commentSchema)

module.exports = { BlogPost, CommentPost };
