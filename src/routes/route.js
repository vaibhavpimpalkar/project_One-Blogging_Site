const express=require("express")
const router=express.Router();
const authorController=require("../Controllers/authorController")
const blogController=require("../Controllers/blogController")
const middlewares = require("../middleware/auth")

// ________________________________Author Api_________________________________
router.post("/authors", authorController.authors)

router.post("/login", authorController.authorLogin)

// ________________________________Blogs Api_________________________________
router.post("/blogs", middlewares.authentication, blogController.createBlog)

router.get("/blogs", middlewares.authentication, blogController.getBlog)

router.put("/blogs/:blogId", middlewares.authentication, middlewares.authorization, blogController.updateBlog)

router.delete("/blogs/:blogId", middlewares.authentication, middlewares.authorization, blogController.deleteBlogByPathParams)

router.delete("/blogs", middlewares.authentication, blogController.deletedBlogByQueryParam)

module.exports = router;
