const {Router} = require("express")
const {handleCreateUser} = require("../controllers/userController")

const router = Router()

router.get("/signup",(req,res)=>{
    res.render("signup")
})

router.post("/signup",handleCreateUser)

module.exports = router