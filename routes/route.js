import { Router } from "express";
import {
  AddFoodToDB,
  RandomFoods,
  SearchMenuByName,
  SearchMenuByID,
} from "../controller/random.js";

const router = Router();

// @desc Add foods to database
// @route POST /add-foods
// @access Private
router.post("/add-foods", AddFoodToDB);

// @desc Add foods to database
// @route POST /random-foods
// @access Public
router.post("/random-foods", RandomFoods);

// @desc Search for menu by name
// @route POST /search-menu-by-name
// @access Public
router.post("/search-menu-by-name", SearchMenuByName);

// @desc Search for menu by name
// @route POST /search-menu
// @access Public
router.get("/search-menu-by-id/:id", SearchMenuByID);

export default router;
