const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const userRoute = require("./routes/userRoute")
const cookieParser = require("cookie-parser")
const { checkForAuthenticationCookie } = require("./middleware/authenticationMiddleware")

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

app.get("/", (req, res) => {
    res.render("home", {
        user: req.user
    })
})

app.use("/user", userRoute)

app.listen(PORT, () => {
    console.log("Server is running at PORT : ", PORT)
})