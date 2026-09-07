const { Router } = require("express")
const multer = require("multer")
const path = require("path")

const { handleCreateBlog } = require("../controllers/blogController")

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/uploads"))
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })

router.get("/add-new", (req, res) => {
    res.render("addBlog", {
        user: req.user,
    })
})

router.post("/", upload.single("coverImage"), handleCreateBlog)

module.exports = router