const { z } = require("zod");

const commentSchema = z.object({
    commenterId: z
        .string({ required_error: "user is required" })
        .trim()
        .min(3, { message: "user must be at least of 3 characters" })
        .max(40, { message: "user must not be more than 40 characters" }),
    blogId: z
        .string({ required_error: "user is required" })
        .trim()
        .min(3, { message: "user must be at least of 3 characters" })
        .max(40, { message: "user must not be more than 40 characters" }),
    comment: z
        .string({ required_error: "comment is required" })
        .trim()
        .min(1, { message: "Content must be present" })
});


const blogPostSchema = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .trim()
        .min(3, { message: "Title must be at least of 3 characters" }),
    bloggerId: z
        .string({ required_error: "user is required" })
        .trim()
        .min(3, { message: "user must be at least of 3 characters" })
        .max(40, { message: "user must not be more than 40 characters" }),
    content: z
        .string({ required_error: "content is required" })
        .trim()
        .min(1000, { message: "Content must be at least of 150 words" }),
    like: z
        .number({ required_error: " like count is required" })
        .default(0),
    dislike: z
        .number({ required_error: " dislike count is required" })
        .default(0)
})

const blogDeleteSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),
    _id: z
        .string({ required_error: "BlogID is required" })
        .trim()
        .min(3, { message: "BlogID must be at least of 3 characters" })
})
const commentDeleteSchema = z.object({
    commenterId: z
        .string({ required_error: "CommenterID is required" })
        .trim()
        .min(3, { message: "CommenterID must be at least of 3 characters" })
        .max(255, { message: "CommenterID must not be more than 255 characters" }),
    _id: z
        .string({ required_error: "Title is required" })
        .trim()
        .min(3, { message: "Title must be at least of 3 characters" }),
    blogId: z
        .string({ required_error: "user is required" })
        .trim()
        .min(3, { message: "user must be at least of 3 characters" })
        .max(200, { message: "user must not be more than 40 characters" }),

})
console.log("Hi from validator")
module.exports = { blogPostSchema, commentSchema, blogDeleteSchema, commentDeleteSchema };