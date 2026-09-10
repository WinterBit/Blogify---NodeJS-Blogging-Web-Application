const Blog = require("../models/blog")
const Comment = require("../models/comment")
const { param } = require("../routes/blogRoute")

async function handleCreateBlog(req, res) {
    const { title, body } = req.body
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    res.redirect(`/blog/${blog._id}`)
}

async function handleViewBlog(req,res) {
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comment.find({blogId: req.params.id}).populate("createdBy")
    return res.render("blog",{
        user:req.user,
        blog,
        comments,
    })
}

async function handleCreateComment(req,res) {
    const comment = await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    })
    return res.redirect(`/blog/${req.params.blogId}`)
}

module.exports = {
    handleCreateBlog,
    handleViewBlog,
    handleCreateComment,
}