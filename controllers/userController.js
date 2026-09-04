const User = require("../models/user")

async function handleCreateUser(req, res) {
    const { fullName, email, password } = req.body
    await User.create({ fullName: fullName, email: email, password: password })

    return res.redirect("/")
}

module.exports = {
    handleCreateUser,
}