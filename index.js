const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const { checkForAuthenticationCookie } = require("./middleware/authenticationMiddleware")

const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/blogRoute")
const Blog = require("./models/blog")

const app = express()
const PORT = 3000

mongoose.connect("mongodb://127.0.0.1:27017/Blogify")
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(err => console.log(err))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({})
    res.render("home", {
        user: req.user,
        blogs: allBlogs
    })
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.listen(PORT, () => {
    console.log("Server is running at PORT : ", PORT)
})