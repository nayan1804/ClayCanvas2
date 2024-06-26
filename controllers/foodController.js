import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item
const addFood = async (req, res) => {
    let image = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image
    })

    try {
        await food.save();
        res.json({
            success: true,
            message: "Item Added"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error in backend"
        })
    }
}

// all Item list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: true,
            message: "Error"
        })
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Item Removed"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error"
        })
    }
}

export {
    addFood,
    listFood,
    removeFood
}
