import express from "express";
import {} from "../Controllers/Controllers";

const router = express.Router();

router.post("/post", (res, req) => {
	console.log(res);
});

export default router;
