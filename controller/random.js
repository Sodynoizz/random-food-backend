import fs from "fs";
import path from "path";
import FoodModel from "../models/foodModel.js";
import { getRandomNumber } from "../utils/utils.js";

export const RandomFoods = async (req, res) => {
  const { foodtype, place } = req.body;

  try {
    let filter = {};
    if (foodtype !== "all") filter.foodtype = foodtype;
    if (place !== "all") filter.place = place;

    const foods = await FoodModel.find(filter);
    if (!foods.length)
      return res
        .status(400)
        .send({ err: `Cannot find foods in ${foodtype} category at ${place}` });

    const randIdx = getRandomNumber(0, foods.length - 1);
    const randomFood = foods[randIdx];
    return res.status(200).send(randomFood);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err: "Internal Server Error" });
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

export const SearchMenuByPlace = async (req, res) => {
  const { place } = req.body;
  try {
    const foods = await FoodModel.findOne({ place: place });
    if (foods) {
      return res.status(200).send(foods);
    } else {
      return res.status(404).send({ err: "Cannot find a matching place" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err: "Internal Server Error" });
  }
};
