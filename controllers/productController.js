const Product = require("../models/productModels");
const Category = require("../models/categoryModels");

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;

    //check if product name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product name must be unique" });
    }
    //create the product
    const product = new Product({ name, price, category, stock });
    await product.save();

    //Add product to the specified category
    const categoryDoc = await Category.findOne({ name: category });
    if (categoryDoc) {
      categoryDoc.products.push(product._id);
      await categoryDoc.save();
    }
    res.status(201).json({ message: "Product created successfully ", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product.", error });
  }
};

//2 get product by ID with category
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error feetching  product", error });
  }
};

//3 Update a product (Price,stock,  or category)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, stock, category } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    //update the dields
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;

    //if category is updated, handle cateory association
    if (category && category !== product.category) {
      const oldCategory = await Category.findOne({ name: product.category });
      const newCategory = await Category.findOne({ name: category });

      //Remove product from old category
      if (oldCategory) {
        oldCategory.products = oldCategory.products.filter(
          (prodId) => prodId.toString() !== id
        );
        await oldCategory.save();
      }
      //Add product to new category
      if (newCategory) {
        newCategory.products.push(product._id);
        await newCategory.save();
      }
      product.category = category;
    }
    await product.save();
    res.status(200).json({ message: "Product update successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", Error });
  }
};


//4.Delete a product
exports.deleteProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const product=await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }

        //Remove product from associated category
        const category=await Category.findOne({name:product.category})
        if(category){
            category.products=category.products.filter(
                (prodId)=>prodId.toString() !==id
            )
            await category.save()
        }
        res.status(200).json({message:"Product deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Error deleting product",error})
    }
}