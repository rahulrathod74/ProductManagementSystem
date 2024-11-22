const express=require("express")
const router=express.Router()

const {
    createProduct,
    getProductById,
    updateProduct,
}=require("../controllers/productController")
const { route } = require("./categoryRoutes")


router.post("/create",createProduct)
router.get("/:id",getProductById)
router.put("/update/:id",updateProduct)

module.exports=router