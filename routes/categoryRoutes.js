const express=require("express")
const router=express.Router()

const{
    createCategory,
    getCategoryById,
    updatecategory,
}=require("../controllers/categoryController")

router.post("/create",createCategory)
router.get("/:id",getCategoryById)
router.put("/update/:id",updatecategory)

module.exports=router