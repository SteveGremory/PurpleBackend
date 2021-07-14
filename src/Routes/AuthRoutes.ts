import { CreateUser, LoginUser, DeleteUser } from "../Controllers/Controllers";
import CheckAuth from "../Middleware/Check-Auth";

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Hello.");
});

router.post("/signup", CreateUser);
router.post("/login", LoginUser);
router.post("/delete", CheckAuth, DeleteUser);

export default router;
