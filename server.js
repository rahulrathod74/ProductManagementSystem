const express=require("express")
const mongoose=require("mongoose")
const dotenv = require("dotenv")

//Load environment variable
dotenv.config()

const productRoutes=require("./routes/productRoutes")
const categoryRoutes=require("./routes/categoryRoutes")


//middleware
app.use(express.json()) //parse JSON without body-Parser

//Routes
app.use("/api/products",productRoutes)
app.use("/api/categories",categoryRoutes)


//Database connection
mongoose.connect(process.env.MONGO_URI,{useNewurlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connected to MongoDB");
    app.listen(PORT,()=>console.log(`server running on port ${PORT}`));

})
.catch((error)=>console.log("Database connection failed",error));
