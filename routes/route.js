import { Router } from "express";
import { AddFoodToDB, RandomFoods } from "../controller/random.js";

const router = Router();

// @desc Add foods to database
// @route POST /add-foods
// @access Private
router.post("/add-foods", AddFoodToDB);

// @desc Add foods to database
// @route POST /random-foods
// @access Public
router.post("/random-foods", RandomFoods);

export default router;