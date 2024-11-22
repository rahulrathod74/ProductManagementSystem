const  Category=require("../models/categoryModels")

//1. create a Category
exports.CcreateCategory=async (req,res)=>{
    try {
        const {name,description}=req.body

        //check if category name already exists
        const existingCategory=await Category.findOne({name})
        if(existingCategory){
            return res.status(400).json({message:"Category name must be unique"})
        }
        const category=new Category({name,description})
        await category.save()
        res.status(201).json({message:"category created successfully",category})
    } catch (error) {
        res.status(500).json({message:"Error creating category",error})
    }
} 

//2.get category by Id with associated products
exports.getCategoryById=async (req,res)=>{
    try {
        const {id}=req.params
        const category=await Category.findById(id).populate("Product")
        if(!category){
            return res.status(404).json({message:"Category not found"})
        }
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({message:"Error fetching category",error})
    }
}

//3. Update a category description or name 
exports.updateCategory=async(req,res)=>{
    try {
        const {id}=req.params
        const {name,description}=req.body

        const category=await Category.findById(id)
        if(!category){
            return res.status(400).json({message:"Category not found"})
        }
        if(name !== undefined) category.nmae =name
        if(description !== undefined) category.description= description

        await category.save()
        res.status(200).json({message:"category updated successfully",category})
    } catch (error) {
        res.status(500).json({message:"Error updating category",error})
    }
}