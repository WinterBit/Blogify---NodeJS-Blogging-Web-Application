const Blog = require("../models/blog")

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

module.exports = {
    handleCreateBlog,
}