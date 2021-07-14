import jwt from "jsonwebtoken";

const CheckAuth = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decoded = jwt.verify(token, "secret");
		req.userData = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: "Auth failed",
		});
	}
};

export default CheckAuth;
