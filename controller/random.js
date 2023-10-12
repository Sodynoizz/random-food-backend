import fs from "fs";
import path from "path";
import FoodModel from "../models/foodModel.js";
import { getRandomNumber } from "../utils/utils.js";

export const AddFoodToDB = async (req, res) => {
  const filePath = path.join(process.cwd(), "models", "foods.json");
  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
      console.log(err);
      return res.status(404).send("File not found");
    } else {
      const jsonData = JSON.parse(data);
      for (let i = 1; i <= 66; i++) {
        const res = {
          id: `${i}`,
          place: jsonData[`${i}`]["โรงอาหาร"],
          shopname: jsonData[`${i}`]["ชื่อร้านอาหาร"],
          foodtype: jsonData[`${i}`]["ประเภท"],
          foodname: jsonData[`${i}`]["ชื่ออาหาร"],
          price: jsonData[`${i}`]["ราคา (ต่อหน่วย)"],
          note: jsonData[`${i}`]["note"],
          images: jsonData[`${i}`]["images"],
        };
        await FoodModel.create(res);
      }
      return res.status(200).send("Update Data Successfully");
    }
  });
};

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
      const randomIndex = Math.floor(getRandomNumber(0, randomFoodsByType.length - 1));

      if (randomIndex === -1) {
        return res.status(400).send({ err: `Cannot found foods in ${foodtype} category`})
      } 
      const foods = randomFoodsByType[randomIndex];
      return res.status(200).send(foods);
    } catch (err) {
      console.error(`Error: ${err}`);
      return res.status(500).send({ err: "Internal Server Error" });
    }
  }
};
