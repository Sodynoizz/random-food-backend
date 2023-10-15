import { Router } from "express";
import {
  AddFoodToDB,
  RandomFoods,
  SearchMenuByName,
  SearchMenuByID,
  SearchMenuByPlace
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

// @desc Search for menu by id
// @route POST /search-menu-by-id
// @access Public
router.get("/search-menu-by-id/:id", SearchMenuByID);

// @desc Search for menu by place
// @route POST /search-menu-by-place
// @access Public
router.post("/search-menu-by-place", SearchMenuByPlace);

export default router;
