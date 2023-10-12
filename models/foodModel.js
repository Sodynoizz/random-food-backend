import { Schema, model } from "mongoose";

const FoodSchema = new Schema({
    "id": {
        type: String,
        require: true,
        unique: true,
    },
    "place": {
        type: String,
        require: true,
        unique: false,
    },
    "shopname": {
        type: String,
        require: true,
        unique: false,
    },
    "foodtype": {
        type: String,
        require: true,
        unique: false,
    },
    "foodname": {
        type: String,
        require: true,
        unique: false,
    },
    "price": {
        type: String,
        require: true,
        unique: false,
    },
    "note": {
        type: String,
        require: false,
        unique: false,
    },
    "images": {
        type: String,
        require: false,
        unique: false,
    }
});

const FoodModel = model("Foods", FoodSchema);
export default FoodModel;