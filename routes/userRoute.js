const { Router } = require("express")
const { handleCreateUser, handleSignIn } = require("../controllers/userController")

const router = Router()

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.get("/signin", (req, res) => {
    res.render("signin")
})

router.post("/signup", handleCreateUser)
router.post("/signin", handleSignIn)

module.exports = router