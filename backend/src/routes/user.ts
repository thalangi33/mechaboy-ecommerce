import express from "express";
import UserController from "../controllers/user.controller";
// import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

// router.use(requireAuth);

// get user information
router.post("/getUserInfo", UserController.getUserInfo);

// login route
router.post("/login", UserController.loginUser);

// signup route
router.post("/signup", UserController.signupUser);

// verifying email
router.post("/verification", UserController.verifyEmail);

// confirm email
router.get("/confirmation/:token", UserController.confirmEmail);

// change display name
router.post("/changeDisplayName", UserController.changeDisplayName);

// change email
router.post("/changeEmail", UserController.changeEmail);

// change password
router.post("/changePassword", UserController.changePassword);

// get favorites
router.post("/getFavorites", UserController.getFavorites);

// get favoritesId
router.post("/getFavoritesId", UserController.getFavoritesId);

// add favorite
router.post("/addFavorite", UserController.addFavorite);

// remove favorite
router.post("/removeFavorite", UserController.removeFavorite);

export default router;
