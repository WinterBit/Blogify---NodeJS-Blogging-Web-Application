const User = require("../models/user")

async function handleCreateUser(req, res) {
    const { fullName, email, password } = req.body
    await User.create({ fullName: fullName, email: email, password: password })

    return res.redirect("/")
}

async function handleSignIn(req, res) {
    const { email, password } = req.body
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password)
        return res.cookie("token", token).redirect("/")
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect Email or Password"
        })
    }
}

async function handleLogOut(req, res) {
    return res.clearCookie("token").redirect("/")
}

module.exports = {
    handleCreateUser,
    handleSignIn,
    handleLogOut,
}