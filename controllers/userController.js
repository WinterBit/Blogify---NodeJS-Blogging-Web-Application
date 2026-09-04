const User = require("../models/user")

async function handleCreateUser(req, res) {
    const { fullName, email, password } = req.body
    await User.create({ fullName: fullName, email: email, password: password })

    return res.redirect("/")
}

async function handleSignIn(req, res) {
    const { email, password } = req.body
    const user = await User.matchPassword(email, password)
    console.log(user)
    res.redirect("/")
}

module.exports = {
    handleCreateUser,
    handleSignIn,
}