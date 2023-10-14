import fs from "fs";
import path from "path";
import FoodModel from "../models/foodModel.js";
import { getRandomNumber } from "../utils/utils.js";
export const RandomFoods = async (req, res) => {
  const { foodtype } = req.body;

  if (foodtype === "all" || foodtype === "") {
    try {
      const modelCounts = await FoodModel.countDocuments({});
      const randomIndex = Math.floor(getRandomNumber(1, modelCounts + 1));
      const foods = await FoodModel.findOne({}).skip(randomIndex - 1);
      return res.status(200).send(foods);
    } catch (err) {
      console.error(`Error: ${err}`);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  } else {
    try {
      const randomFoodsByType = await FoodModel.find({ foodtype: foodtype });
      const randomIndex = Math.floor(
        getRandomNumber(0, randomFoodsByType.length - 1)
      );

      if (randomIndex === -1) {
        return res
          .status(400)
          .send({ err: `Cannot found foods in ${foodtype} category` });
      }
      const foods = randomFoodsByType[randomIndex];
      return res.status(200).send(foods);
    } catch (err) {
      console.error(`Error: ${err}`);
      return res.status(500).send({ err: "Internal Server Error" });
    }
  }
};

export const AddFoodToDB = async (req, res) => {
  const { place, shopname, foodtype, foodname, price, note, images } = req.body;
  try {
    const modelCounts = await FoodModel.countDocuments({});
    const result = {
      id: `${modelCounts + 1}`,
      place: place,
      shopname: shopname,
      foodtype: foodtype,
      foodname: foodname,
      price: price,
      note: note,
      images: images,
    };
    await FoodModel.create(result);
    return res.status(200).send(`Update menu ${foodname} successfully`);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

export const SearchMenuByName = async (req, res) => {
  const { foodname } = req.body;
  try {
    const foods = await FoodModel.find({
      foodname: { $regex: new RegExp(foodname, "i") },
    });
    if (foods.length) {
      return res.status(200).send(foods);
    } else {
      return res.status(404).send({ err: "Cannot find a matching food name" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err: "Internal Server Error" });
  }
};

export const SearchMenuByID = async (req, res) => {
  const { id } = req.params;
  try {
    const foods = await FoodModel.findOne({ id: id });
    if (foods) {
      return res.status(200).send(foods);
    } else {
      return res.status(404).send({ err: "Cannot find a matching food id" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err: "Internal Server Error" });
  }
};
