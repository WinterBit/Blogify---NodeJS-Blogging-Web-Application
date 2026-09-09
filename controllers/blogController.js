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

async function handleViewBlog(req,res) {
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    console.log(blog)
    return res.render("blog",{
        user:req.user,
        blog,
    })
}

module.exports = {
    handleCreateBlog,
    handleViewBlog,
}