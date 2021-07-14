import { CreateUser, LoginUser, DeleteUser } from "../Controllers/Controllers";

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Hello.");
});

router.post("/signup", CreateUser);
router.post("/login", LoginUser);
router.delete("/:userId", DeleteUser);

export default router;
