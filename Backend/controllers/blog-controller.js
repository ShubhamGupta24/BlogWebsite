const model = require("../models/blog-model");


// to post a blog

const blogPost = async (req, res) => {
    try {
        let { title, content, bloggerId, createdAt, like, dislike } = req.body

        const blogPosted = await model.BlogPost.create({ title, content, bloggerId, createdAt, like, dislike });

        return res.status(200).json({
            message: ("Blog Posted Successfully").toString(),
            blogId: blogPosted._id.toString(),
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// to update a blog
const updateBlog = async (req, res) => {
    try {
        const { bloggerId, _id, content } = req.body
        const blog = await model.BlogPost.findById({ _id });
        if (blog && bloggerId === blog.bloggerId.toString()) {
            const updateBlog = await model.BlogPost.updateOne({ _id }, { content }, { new: true })
            if (updateBlog) {
                return res.status(200).json({ message: "Blog Updated", updateBlog })
            }
        }
        return res.status(404).json({ message: "Couldn't update the blog", blog, bloggerId })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// to post comments

const commentPost = async (req, res) => {
    const { commenterId, blogId, comment } = req.body;
    try {
        console.log(blogId)
        const findBlog = await model.BlogPost.findById({ _id: blogId });
        if (findBlog) {
            const commentPosted = await model.CommentPost.create({ commenterId, blogId, comment })
            if (commentPosted) {
                return res.status(200).json({ message: "Comment pOSTED sUCCESSFULLY", commentPosted });
            }
        }
        else {
            return res.status(404).json({ message: "blog Not Found", findBlog });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


// to delete a single comment

const commentDelete = async (req, res) => {
    const { commenterId, _id, blogId } = req.body;
    const findBlog = await model.BlogPost.findById({ _id: blogId });

    try {
        if (findBlog) {
            const deletedComment = await model.CommentPost.deleteOne({ _id });
            if (!deletedComment && deletedCount === 1) {
                return res.status(404).json({ message: "Comment not found" });
            }
            return res.status(200).json({ message: "Comment deleted", deletedComment });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server ERROR", error })
    }
}


// to delete a blog and all the comments

const blogDelete = async (req, res) => {
    const { _id } = req.body;
    const blogId = _id;
    const findBlog = await model.BlogPost.findOne({ _id });
    const findComments = await model.CommentPost.find({ blogId })
    try {
        if (findBlog) {
            const deletedBlog = await model.BlogPost.deleteOne({ _id });
            const deletedComment = findComments ? await model.CommentPost.deleteMany({ blogId }) : null;
            if (!deletedBlog) {
                return res.status(404).json({ message: "Blog not found" });
            }
            return res.status(200).json({ message: "Blog and comments(if present) deleted", deletedBlog });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server ERROR", error })
    }
}

// to get all blogs made by an user

const getAllBlogByUser = async (req, res) => {
    const { bloggerId } = req.body;
    try {
        const allBlogs = await model.BlogPost.find({ bloggerId });
        console.log(allBlogs)
        if (!allBlogs) {
            return res.status(404).json({ message: "User hasn't made any blog" });
        }
        return res.status(200).json({ message: "Blogs Received", allBlogs });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server ERROR", error });
    }
}


// to get all the comments made on a blog

const getAllComments = async (req, res) => {
    const { blogId } = req.body;
    try {
        const allComments = await model.CommentPost.find({ blogId });
        if (!allComments) {
            return res.status(404).json({ message: "No comments made on the blog" });
        }
        return res.status(200).json({ message: "Comments Received", allComments });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server ERROR", error });
    }
}


// to get all the blogs in the db

const getAllblogs = async (req, res) => {
    try {
        const blogs = await model.BlogPost.find();
        if (blogs) {
            return res.status(200).json({ message: "All blogs received", blogs });
        }
        return res.status(404).json({ message: "No blog found" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server ERROR", error });
    }
}

// React to a blog i.e. like or dislike

const blogReact = async (req, res) => {
    try {
        const { blogId, like, dislike } = req.body;
        const react = await model.BlogPost.findOneAndUpdate({ _id: blogId }, { like, dislike }, { new: true })
        if (react) {
            res.status(200).json({ message: "Reaction updated", react })
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server ERROR", error });
    }
}

// Wrap functions in curly braces before exporting
module.exports = { blogPost, blogDelete, commentPost, commentDelete, getAllBlogByUser, getAllComments, getAllblogs, updateBlog, blogReact };
